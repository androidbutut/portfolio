import { useCallback, useEffect, useRef, useState } from 'react'

/** Simple Web Audio based SFX manager – no external deps */
export function useSound() {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const engineOscRef = useRef<OscillatorNode | null>(null)
  const engineGainRef = useRef<GainNode | null>(null)

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const startEngine = useCallback(() => {
    if (!enabled) return
    const ctx = ensureCtx()
    if (engineOscRef.current) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.value = 48
    gain.gain.value = 0.035

    lfo.frequency.value = 0.35
    lfoGain.gain.value = 4
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    lfo.start()

    engineOscRef.current = osc
    engineGainRef.current = gain
  }, [enabled, ensureCtx])

  const stopEngine = useCallback(() => {
    if (engineOscRef.current) {
      try {
        engineOscRef.current.stop()
      } catch {}
      engineOscRef.current = null
      engineGainRef.current = null
    }
  }, [])

  const playWhoosh = useCallback(() => {
    if (!enabled) return
    const ctx = ensureCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(280, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.35)

    filter.type = 'lowpass'
    filter.frequency.value = 1200

    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.45)
  }, [enabled, ensureCtx])

  const playClick = useCallback(() => {
    if (!enabled) return
    const ctx = ensureCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.value = 660
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  }, [enabled, ensureCtx])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      if (!next) stopEngine()
      else {
        setTimeout(() => startEngine(), 50)
      }
      return next
    })
  }, [startEngine, stopEngine])

  useEffect(() => {
    return () => {
      stopEngine()
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {})
      }
    }
  }, [stopEngine])

  useEffect(() => {
    if (enabled) startEngine()
    else stopEngine()
  }, [enabled, startEngine, stopEngine])

  return { enabled, toggle, playWhoosh, playClick }
}
