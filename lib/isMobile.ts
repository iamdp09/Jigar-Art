// lib/isMobile.ts
// Single source of truth for device tier detection.
// Used by ShivaGLBViewer and any other heavy component.

export type DeviceTier = 'low' | 'mid' | 'high'

/**
 * Returns device tier based on UA + DPR heuristic.
 *
 * | Tier   | Device                        | DPR      | GLB             | DPR cap |
 * |--------|-------------------------------|----------|-----------------|---------|
 * | 'high' | Desktop / laptop              | any      | desktop (6.8MB) | 2.0     |
 * | 'mid'  | Modern smartphone (DPR ≥ 1.5) | ≥ 1.5    | mid    (3–4MB)  | 1.2     |
 * | 'low'  | Budget phone (DPR < 1.5)      | < 1.5    | low    (2–3MB)  | 0.8     |
 *
 * SSR-safe: returns 'high' on the server.
 */
export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high'

  const ua  = navigator.userAgent
  const dpr = window.devicePixelRatio ?? 1

  const isMobileUA = /Mobi|Android|iPhone|iPad/i.test(ua)
  if (!isMobileUA) return 'high'

  // DPR < 1.5 = budget/old phone, DPR ≥ 1.5 = mid-range modern phone
  return dpr < 1.5 ? 'low' : 'mid'
}

/** True on any mobile/tablet device. */
export function isMobileDevice(): boolean {
  return getDeviceTier() !== 'high'
}

/**
 * Returns the renderer pixel ratio cap for each tier.
 * Going below 1.0 (budget) renders at sub-native resolution —
 * massive GPU win on very old screens.
 */
export function getDPRCap(): number {
  const tier = getDeviceTier()
  if (tier === 'low')  return 0.8   // sub-native — big GPU saving on budget phones
  if (tier === 'mid')  return 1.2   // just above native for Retina control
  return Math.min(window.devicePixelRatio, 2.0)  // desktop: up to 2×
}

/** Returns the correct GLB path for the current device tier. */
export function getGLBPath(): string {
  const tier = getDeviceTier()
  if (tier === 'low')  return '/shiva-model-low.glb'
  if (tier === 'mid')  return '/shiva-model-mobile.glb'
  return '/shiva-model-desktop.glb'
}
