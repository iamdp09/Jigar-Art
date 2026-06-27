'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─── Shaders ──────────────────────────────────────────────── */
const VERT = `
  uniform sampler2D uDepthMap;
  uniform float     uDepthScale;
  uniform float     uPointSize;
  uniform vec2      uMouse;
  uniform float     uProgress;
  uniform float     uTime;
  varying vec2  vUv;
  varying float vDepth;
  varying float vAlpha;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vUv = uv;

    // Sample depth — clamp UVs to avoid edge bleeding
    vec2 safeUv = clamp(uv, 0.001, 0.999);
    float depth  = texture2D(uDepthMap, safeUv).r;
    vDepth = depth;

    vec3 pos = position;
    pos.z += depth * uDepthScale;

    // Scatter → assemble on load
    float rx = rand(uv + vec2(0.1, 0.3));
    float ry = rand(uv + vec2(0.7, 0.2));
    float rz = rand(uv + vec2(0.4, 0.9));
    vec3 scattered = pos + vec3((rx-0.5)*5.0, (ry-0.5)*5.0, (rz-0.5)*2.5);
    pos = mix(scattered, pos, uProgress);

    pos.x += sin(uTime * 0.38 + uv.y * 3.14) * 0.005;
    pos.x += uMouse.x * depth * 0.30;
    pos.y += uMouse.y * depth * 0.30;

    gl_Position   = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize  = uPointSize * (0.65 + depth * 1.35);
    vAlpha        = uProgress;
  }
`

const FRAG = `
  uniform sampler2D uColorMap;
  varying vec2  vUv;
  varying float vDepth;
  varying float vAlpha;

  void main() {
    // Discard transparent background
    vec4 col = texture2D(uColorMap, clamp(vUv, 0.001, 0.999));
    if (col.a < 0.05) discard;

    // Circular particle
    vec2  pc   = gl_PointCoord - 0.5;
    float dist = length(pc);
    if (dist > 0.5) discard;
    float edge = smoothstep(0.5, 0.12, dist);

    // Colour: original darkened + gold tint on near-depth particles
    vec3 dark  = col.rgb * 0.75;
    vec3 gold  = vec3(0.82, 0.65, 0.20);
    vec3 final = mix(dark, gold, vDepth * 0.28);

    gl_FragColor = vec4(final, edge * col.a * vAlpha);
  }
`

/* ─── Dynamic point-size for consistent visual density ─────── */
function computePointSize(W: number, H: number, SEG: number): number {
  // Target: particles cover ~3× canvas area on average (heavy overlap = dense look)
  const numParticles  = SEG * SEG
  const targetOverlap = 3.0
  const avgSizeScale  = 0.65 + 0.5 * 1.35   // at depth=0.5
  const r = Math.sqrt((targetOverlap * W * H) / (numParticles * Math.PI)) / avgSizeScale
  // diameter = 2r; that's gl_PointSize in pixels
  return Math.max(3.0, Math.min(14.0, r * 2))
}

/* ─── Main component ────────────────────────────────────────── */
export default function ShivaDepthCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId    = 0
    let renderer: THREE.WebGLRenderer | null = null

    const init = (W: number, H: number) => {
      if (renderer) return

      // ── Renderer ──────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)
      // Prevent Three.js from applying its own output colour-space correction
      // (we manage colour in the shader directly)
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace
      container.appendChild(renderer.domElement)

      // ── Scene / Camera ────────────────────────────────────
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
      camera.position.z = 4.5

      // ── Geometry — same quality everywhere ────────────────
      // Use same SEG for both mobile & desktop; only point size adapts.
      const SEG  = 200
      const ps   = computePointSize(W, H, SEG)

      console.log(`[ShivaCanvas] init  W=${W} H=${H} SEG=${SEG} pointSize=${ps.toFixed(2)}`)

      const geo  = new THREE.PlaneGeometry(2.8, 4.3, SEG, SEG)
      // ↑ aspect 2.8:4.3 matches source image 403:619 (≈0.651)

      // ── Uniforms ──────────────────────────────────────────
      const uniforms: Record<string, THREE.IUniform> = {
        uColorMap:   { value: null },
        uDepthMap:   { value: null },
        uDepthScale: { value: 1.8 },
        uPointSize:  { value: ps },
        uMouse:      { value: new THREE.Vector2(0, 0) },
        uProgress:   { value: 0.0 },
        uTime:       { value: 0.0 },
      }

      const mat = new THREE.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: true,
        depthWrite:  false,
        blending:    THREE.NormalBlending,
      })

      const points = new THREE.Points(geo, mat)
      scene.add(points)

      // ── Texture loading ───────────────────────────────────
      const loader = new THREE.TextureLoader()
      let colorReady = false
      let depthReady = false

      const onBothLoaded = () => {
        console.log('[ShivaCanvas] both textures ready → starting animation')
        beginAnim()
      }

      const loadTex = (
        url: string,
        isDepth: boolean,
        cb: () => void
      ) => {
        loader.load(
          url,
          (tex) => {
            // Prevent any GPU colour-space conversion on the depth map — it must
            // remain linear so vertex-shader depth values are not gamma-crushed.
            tex.colorSpace  = THREE.NoColorSpace
            tex.minFilter   = THREE.LinearFilter
            tex.magFilter   = THREE.LinearFilter
            tex.generateMipmaps = false
            tex.needsUpdate = true

            console.log(
              `[ShivaCanvas] loaded ${url}`,
              `size=${tex.image?.width}×${tex.image?.height}`,
              `colorSpace=${tex.colorSpace}`
            )

            if (isDepth) {
              uniforms.uDepthMap.value = tex
              depthReady = true
            } else {
              uniforms.uColorMap.value = tex
              colorReady = true
            }
            if (colorReady && depthReady) cb()
          },
          undefined,
          (err) => console.error(`[ShivaCanvas] failed to load ${url}`, err)
        )
      }

      loadTex('/shiva.png',       false, onBothLoaded)
      loadTex('/shiva-depth.png', true,  onBothLoaded)

      // ── Animation loop ────────────────────────────────────
      const beginAnim = () => {
        let progress = 0
        const mouse  = new THREE.Vector2(0, 0)
        const tgt    = new THREE.Vector2(0, 0)
        let   last   = performance.now()

        const tick = () => {
          rafId = requestAnimationFrame(tick)
          const now   = performance.now()
          const delta = Math.min((now - last) / 1000, 0.05)
          last = now

          progress = Math.min(1, progress + delta * 0.45)
          uniforms.uProgress.value += (progress - uniforms.uProgress.value) * 0.07
          uniforms.uTime.value     += delta

          mouse.x += (tgt.x - mouse.x) * 0.06
          mouse.y += (tgt.y - mouse.y) * 0.06
          uniforms.uMouse.value.copy(mouse)

          points.rotation.y = Math.sin(uniforms.uTime.value * 0.20) * 0.055 + mouse.x * 0.18
          points.rotation.x = mouse.y * 0.10

          renderer!.render(scene, camera)
        }
        tick()

        // Mouse
        const onMove = (e: MouseEvent) => {
          const r = container.getBoundingClientRect()
          tgt.x =  ((e.clientX - r.left) / r.width  - 0.5) * 2
          tgt.y = -((e.clientY - r.top)  / r.height - 0.5) * 2
        }
        // Touch
        const onTouch = (e: TouchEvent) => {
          const t = e.touches[0]
          const r = container.getBoundingClientRect()
          tgt.x =  ((t.clientX - r.left) / r.width  - 0.5) * 2
          tgt.y = -((t.clientY - r.top)  / r.height - 0.5) * 2
        }

        window.addEventListener('mousemove',   onMove)
        window.addEventListener('mouseleave',  () => { tgt.x = 0; tgt.y = 0 })
        window.addEventListener('touchmove',   onTouch, { passive: true })

        // Gyro
        window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
          if (e.gamma != null && e.beta != null) {
            tgt.x = Math.max(-1, Math.min(1, e.gamma / 30))
            tgt.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30))
          }
        })

        // Resize
        window.addEventListener('resize', () => {
          const nW = container.clientWidth
          const nH = container.clientHeight
          if (!nW || !nH) return
          renderer!.setSize(nW, nH)
          camera.aspect = nW / nH
          camera.updateProjectionMatrix()
          // Recompute point size for new dimensions
          uniforms.uPointSize.value = computePointSize(nW, nH, SEG)
          console.log(`[ShivaCanvas] resize → W=${nW} H=${nH} ps=${uniforms.uPointSize.value.toFixed(2)}`)
        })
      }
    }

    // ResizeObserver waits for real pixel dimensions before init
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) init(width, height)
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
      if (renderer) {
        renderer.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div style={{
        position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
        fontSize: '0.64rem', color: 'var(--color-text-muted)',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
      }}>
        <span style={{ opacity: 0.4 }}>✦</span> Move cursor to explore
      </div>
    </div>
  )
}
