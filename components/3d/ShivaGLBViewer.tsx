'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { getDeviceTier, isMobileDevice, getDPRCap, getGLBPath } from '@/lib/isMobile'

/* ─────────────────────────────────────────────────────────────
   ShivaGLBViewer — Mobile-first, tier-adaptive 3D viewer
   • low  tier : 40 particles, no shadows, DPR=1.0, frame-skip
   • mid  tier : 80 particles, no shadows, DPR=1.5, frame-skip
   • high tier : 220 particles, shadows, DPR≤2.0, full 60fps
   • Auto-rotate with drag/touch override
   ───────────────────────────────────────────────────────────── */

interface Props {
  height?: number
}

export default function ShivaGLBViewer({ height = 580 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadPct,  setLoadPct]  = useState(0)
  const [loaded,   setLoaded]   = useState(false)
  const [error,    setError]    = useState(false)
  const [hint,     setHint]     = useState('')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ── Device tier detection ────────────────────────────────
    const tier    = getDeviceTier()
    const isLow   = tier === 'low'
    const isMid   = tier === 'mid'
    const isMob   = isMobileDevice()

    // Hint text
    setHint(isMob ? 'Touch to explore' : 'Drag to explore')

    // GLB path and DPR — from shared utility (matches spec exactly)
    const modelPath = getGLBPath()    // low→low.glb, mid→mobile.glb, high→desktop.glb
    const dprCap    = getDPRCap()     // low→0.8, mid→1.2, high→min(dpr,2.0)

    // ── Mutable state (kept outside React) ──────────────────
    let rafId        = 0
    let renderer: THREE.WebGLRenderer | null = null
    let model: THREE.Group | null = null

    let autoAngle  = 0
    let manualDY   = 0
    let manualDX   = 0
    let isDragging = false
    let px = 0, py = 0

    // Frame-skip for mid/low: render every 2nd frame (~30–45fps on mobile)
    let frameCounter = 0
    const frameSkip  = isLow ? 2 : isMid ? 1 : 0

    const DRAG_SPEED_X = 0.011
    const DRAG_SPEED_Y = 0.006
    const AUTO_SPEED   = 0.0028

    // ── Renderer + scene init ────────────────────────────────
    const init = (W: number, H: number) => {
      if (renderer) return

      // Tier-adaptive DPR from shared utility: low=0.8, mid=1.2, high≤2.0
      renderer = new THREE.WebGLRenderer({
        alpha:           true,
        antialias:       !isMob,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(dprCap)
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled    = !isMob   // no shadows on any mobile
      renderer.shadowMap.type       = THREE.PCFShadowMap
      renderer.outputColorSpace     = THREE.SRGBColorSpace
      renderer.toneMapping          = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure  = 1.2
      container.appendChild(renderer.domElement)

      // Scene & Camera
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 200)
      camera.position.set(0, 0.4, 6.5)

      // ── Spiritual Lighting Rig ───────────────────────────
      // 1. Warm golden key light
      const key = new THREE.DirectionalLight(0xFFF4C0, 3.6)
      key.position.set(4, 7, 4)
      if (!isMob) {
        key.castShadow = true
        // mid=256, high=512 — 4× less shadow memory on mid
        const shadowRes = isMid ? 256 : 512
        key.shadow.mapSize.set(shadowRes, shadowRes)
        key.shadow.camera.near = 0.1
        key.shadow.camera.far  = 30
      }
      scene.add(key)

      // 2. Cool fill from left
      const fill = new THREE.DirectionalLight(0xD8E8FF, 0.9)
      fill.position.set(-4, 2, 3)
      scene.add(fill)

      // 3. Gold rim from behind
      const rim = new THREE.DirectionalLight(0xC9A84C, 2.8)
      rim.position.set(0, 3, -6)
      scene.add(rim)

      // 4. Warm bounce from below
      const bounce = new THREE.DirectionalLight(0xFFE8A0, 0.55)
      bounce.position.set(0, -4, 2)
      scene.add(bounce)

      // 5. Soft ambient
      const ambient = new THREE.AmbientLight(0xFFF8E0, isMob ? 0.7 : 0.45)
      scene.add(ambient)

      // ── Gold Dust Particles — scaled by tier ─────────────
      const PTC = isLow ? 40 : isMid ? 80 : 220
      const ptcPos   = new Float32Array(PTC * 3)
      const ptcPhase = new Float32Array(PTC)
      for (let i = 0; i < PTC; i++) {
        const r     = 1.8 + Math.random() * 2.8
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        ptcPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        ptcPos[i*3+1] = r * Math.cos(phi) * 0.8
        ptcPos[i*3+2] = r * Math.sin(phi) * Math.sin(theta)
        ptcPhase[i]   = Math.random() * Math.PI * 2
      }
      const ptcGeo = new THREE.BufferGeometry()
      ptcGeo.setAttribute('position', new THREE.BufferAttribute(ptcPos, 3))

      const ptcMat = new THREE.PointsMaterial({
        color:           0xC9A84C,
        size:            0.038,
        transparent:     true,
        opacity:         0.55,
        sizeAttenuation: true,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
      })
      const particles = new THREE.Points(ptcGeo, ptcMat)
      scene.add(particles)

      // ── Load GLB ────────────────────────────────────────
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)

      loader.load(
        modelPath,
        (gltf) => {
          model = gltf.scene

          const box    = new THREE.Box3().setFromObject(model)
          const centre = box.getCenter(new THREE.Vector3())
          const size   = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale  = 3.6 / maxDim

          model.position.copy(centre.multiplyScalar(-scale))
          model.scale.setScalar(scale)
          model.userData.scale = scale

          const fovRad = (camera.fov * Math.PI) / 180
          const dist   = (3.6 / 2) / Math.tan(fovRad / 2) * 1.65
          camera.position.set(0, 0.25, dist)
          camera.lookAt(0, 0, 0)

          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow    = !isMob
              child.receiveShadow = !isMob
              const mat = child.material as THREE.MeshStandardMaterial
              if (mat?.isMeshStandardMaterial) {
                mat.envMapIntensity = isLow ? 0.3 : isMid ? 0.5 : 0.7
                mat.needsUpdate     = true
              }
            }
          })

          scene.add(model)
          draco.dispose()   // free Draco WASM memory after load
          setLoaded(true)
        },
        (prog) => {
          if (prog.total > 0) setLoadPct(Math.round((prog.loaded / prog.total) * 100))
        },
        (err) => {
          console.error('[ShivaGLB] load error:', err)
          setError(true)
        }
      )

      // ── Render Loop ──────────────────────────────────────
      let lastTs = performance.now()
      const tick = (ts: number) => {
        rafId = requestAnimationFrame(tick)

        // Frame-skip for mid/low tier mobile (~30–45fps instead of 60)
        frameCounter++
        if (frameSkip > 0 && frameCounter % (frameSkip + 1) !== 0) return

        const dt = Math.min((ts - lastTs) / 1000, 0.05)
        lastTs = ts

        if (model) {
          if (!isDragging) autoAngle += AUTO_SPEED * dt * 60
          const targetY = autoAngle + manualDY
          model.rotation.y += (targetY - model.rotation.y) * 0.04
          model.rotation.x += (manualDX * 0.28 - model.rotation.x) * 0.04

          const elapsed = ts / 1000
          const breathe = 1 + Math.sin(elapsed * 0.75) * 0.0025
          model.scale.setScalar((model.userData.scale ?? 1) * breathe)
        }

        particles.rotation.y -= 0.0004 * dt * 60
        particles.rotation.x += 0.0001 * dt * 60

        if (renderer) renderer.render(scene, camera)
      }
      rafId = requestAnimationFrame(tick)

      // ── Pointer Events (mouse + touch) ───────────────────
      const startDrag = (x: number, y: number) => { isDragging = true; px = x; py = y }
      const moveDrag  = (x: number, y: number) => {
        if (!isDragging) return
        manualDY += (x - px) * DRAG_SPEED_X
        manualDX   = Math.max(-0.35, Math.min(0.35, manualDX + (y - py) * DRAG_SPEED_Y))
        px = x; py = y
      }
      const endDrag = () => {
        isDragging = false
        if (model) autoAngle = model.rotation.y - manualDY
      }

      const onMouseDown  = (e: MouseEvent) => startDrag(e.clientX, e.clientY)
      const onMouseMove  = (e: MouseEvent) => moveDrag(e.clientX, e.clientY)
      const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; startDrag(t.clientX, t.clientY) }
      const onTouchMove  = (e: TouchEvent) => { const t = e.touches[0]; moveDrag(t.clientX, t.clientY) }
      const onResize     = () => {
        const nW = container.clientWidth
        const nH = container.clientHeight
        if (!nW || !nH) return
        renderer!.setSize(nW, nH)
        camera.aspect = nW / nH
        camera.updateProjectionMatrix()
      }

      container.addEventListener('mousedown',  onMouseDown)
      window.addEventListener  ('mousemove',   onMouseMove)
      window.addEventListener  ('mouseup',     endDrag)
      container.addEventListener('touchstart', onTouchStart, { passive: true })
      container.addEventListener('touchmove',  onTouchMove,  { passive: true })
      container.addEventListener('touchend',   endDrag)
      window.addEventListener  ('resize',      onResize,     { passive: true })

      ;(container as any).__cleanupListeners = () => {
        container.removeEventListener('mousedown',  onMouseDown)
        window.removeEventListener  ('mousemove',   onMouseMove)
        window.removeEventListener  ('mouseup',     endDrag)
        container.removeEventListener('touchstart', onTouchStart)
        container.removeEventListener('touchmove',  onTouchMove)
        container.removeEventListener('touchend',   endDrag)
        window.removeEventListener  ('resize',      onResize)
      }
    }

    const ro = new ResizeObserver((entries) => {
      const { width, height: h } = entries[0].contentRect
      if (width > 0 && h > 0) init(width, h)
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
      if (typeof (container as any).__cleanupListeners === 'function') {
        ;(container as any).__cleanupListeners()
      }
      if (renderer) {
        renderer.dispose()
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        renderer = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Three.js canvas mount */}
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0, cursor: loaded ? 'grab' : 'default' }}
      />

      {/* Loading overlay */}
      {!loaded && !error && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '1.4rem', pointerEvents: 'none',
        }}>
          <div style={{ width: 72, height: 72, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid transparent',
              borderTopColor: 'var(--color-gold)',
              borderRightColor: 'var(--color-gold-light)',
              borderRadius: '50%',
              animation: 'spin-slow 1.6s linear infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-gold)', lineHeight: 1, animation: 'glow-breathe 2s ease-in-out infinite' }}>ॐ</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
              Loading sculpture… {loadPct > 0 ? `${loadPct}%` : ''}
            </p>
            <div style={{ width: 120, height: 2, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden', margin: '0 auto' }}>
              <div style={{ height: '100%', width: `${loadPct}%`, background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))', borderRadius: 2, transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.8rem', color: 'var(--color-text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem', pointerEvents: 'none' }}>
          <span style={{ fontSize: '1.6rem' }}>🪨</span>
          <p>Could not load the sculpture. Please check your connection.</p>
        </div>
      )}

      {/* Drag/touch hint after load */}
      {loaded && (
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--color-text-muted)', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', pointerEvents: 'none', opacity: 0.65, fontFamily: 'var(--font-sans)' }}>
          <span style={{ color: 'var(--color-gold)', opacity: 0.7 }}>✦</span>
          {hint}
          <span style={{ color: 'var(--color-gold)', opacity: 0.7 }}>✦</span>
        </div>
      )}
    </div>
  )
}
