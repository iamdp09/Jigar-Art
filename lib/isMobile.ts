// lib/isMobile.ts
// Single source of truth for device tier detection.
// Used by ShivaGLBViewer and any other heavy component.

export type DeviceTier = 'low' | 'mid' | 'high'

/**
 * Returns device tier based on UA + DPR heuristic.
 * - 'high' = desktop / laptop
 * - 'mid'  = modern smartphone (DPR ≥ 1.5)
 * - 'low'  = budget phone or very old device (DPR < 1.5)
 * SSR-safe: returns 'high' on the server.
 */
export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high'

  const ua  = navigator.userAgent
  const dpr = window.devicePixelRatio ?? 1

  const isMobileUA = /Mobi|Android|iPhone|iPad/i.test(ua)
  if (!isMobileUA) return 'high'
  return dpr < 1.5 ? 'low' : 'mid'
}

/** True on any mobile/tablet device. */
export function isMobileDevice(): boolean {
  return getDeviceTier() !== 'high'
}
