'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import createGlobe from 'cobe'

/* ─── Demo data ───────────────────────────────────────────────────────────────── */

const DEMOS = [
  {
    id: 'jp', lat: 35.6762, lng: 139.6503, flag: '\ud83c\uddef\ud83c\uddf5', name: 'Japan',
    input: "country.getCountry('JP')",
    output: "{ name: 'Japan', alpha3: 'JPN', numeric: '392' }",
  },
  {
    id: 'fr', lat: 48.8566, lng: 2.3522, flag: '\ud83c\uddeb\ud83c\uddf7', name: 'France',
    input: "membership.isEU('FR')",
    output: 'true',
  },
  {
    id: 'us', lat: 37.7749, lng: -122.4194, flag: '\ud83c\uddfa\ud83c\uddf8', name: 'USA',
    input: "postalCode.validate('90210', 'US')",
    output: 'true',
  },
  {
    id: 'in', lat: 19.076, lng: 72.8777, flag: '\ud83c\uddee\ud83c\uddf3', name: 'India',
    input: "dialCode.getDialCodes('IN')",
    output: "['+91']",
  },
  {
    id: 'de', lat: 52.52, lng: 13.405, flag: '\ud83c\udde9\ud83c\uddea', name: 'Germany',
    input: "currency.getCurrency('DE')",
    output: "{ code: 'EUR', symbol: '\u20AC', name: 'Euro' }",
  },
  {
    id: 'br', lat: -23.5505, lng: -46.6333, flag: '\ud83c\udde7\ud83c\uddf7', name: 'Brazil',
    input: "subdivision.getByCountry('BR')",
    output: '[ ...27 states ]',
  },
  {
    id: 'au', lat: -33.8688, lng: 151.2093, flag: '\ud83c\udde6\ud83c\uddfa', name: 'Australia',
    input: "geography.getContinent('AU')",
    output: "'Oceania'",
  },
  {
    id: 'gb', lat: 51.5074, lng: -0.1278, flag: '\ud83c\uddec\ud83c\udde7', name: 'UK',
    input: "membership.isSEPA('GB')",
    output: 'false',
  },
]

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

function toPhiTheta(lat: number, lng: number): [number, number] {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  return [lngRad - Math.PI, latRad]
}

/* ─── Component ───────────────────────────────────────────────────────────────── */

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [demoIndex, setDemoIndex] = useState(0)
  const [typedInput, setTypedInput] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [phase, setPhase] = useState<'flying' | 'typing' | 'showing' | 'pausing'>('flying')

  const [initPhi, initTheta] = toPhiTheta(DEMOS[0].lat, DEMOS[0].lng)
  const phiTarget = useRef(initPhi)
  const thetaTarget = useRef(initTheta)
  const phiCurrent = useRef(initPhi)
  const thetaCurrent = useRef(initTheta)

  const nextDemo = useCallback(() => {
    setTypedInput('')
    setShowOutput(false)
    setDemoIndex((i) => {
      const next = (i + 1) % DEMOS.length
      const [p, t] = toPhiTheta(DEMOS[next].lat, DEMOS[next].lng)
      phiTarget.current = p
      thetaTarget.current = t
      return next
    })
    setPhase('flying')
  }, [])

  // Phase state machine
  useEffect(() => {
    const demo = DEMOS[demoIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'flying') {
      timeout = setTimeout(() => setPhase('typing'), 900)
    } else if (phase === 'typing') {
      const full = demo.input
      if (typedInput.length < full.length) {
        timeout = setTimeout(() => {
          setTypedInput(full.slice(0, typedInput.length + 1))
        }, 25 + Math.random() * 25)
      } else {
        timeout = setTimeout(() => {
          setShowOutput(true)
          setPhase('showing')
        }, 200)
      }
    } else if (phase === 'showing') {
      timeout = setTimeout(() => setPhase('pausing'), 2200)
    } else if (phase === 'pausing') {
      timeout = setTimeout(nextDemo, 400)
    }

    return () => clearTimeout(timeout)
  }, [phase, typedInput, demoIndex, nextDemo])

  // Globe
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const size = canvas.offsetWidth

    const markers = DEMOS.map((d) => ({
      location: [d.lat, d.lng] as [number, number],
      size: 0.04,
      id: d.id,
    }))

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiCurrent.current,
      theta: thetaCurrent.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0.05,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.22, 0.74, 0.97],
      glowColor: [0.15, 0.2, 0.4],
      markers,
      markerElevation: 0.02,
    })

    let raf: number
    const animate = () => {
      // Shortest-path phi lerp
      let dp = phiTarget.current - phiCurrent.current
      while (dp > Math.PI) dp -= 2 * Math.PI
      while (dp < -Math.PI) dp += 2 * Math.PI
      phiCurrent.current += dp * 0.08
      thetaCurrent.current += (thetaTarget.current - thetaCurrent.current) * 0.08

      globe.update({
        phi: phiCurrent.current,
        theta: thetaCurrent.current,
      })

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
    }
  }, [])

  const demo = DEMOS[demoIndex]
  const isVisible = phase !== 'pausing'

  return (
    <div className="relative flex flex-col items-center">
      {/*
        Cobe wraps the canvas in its own position:relative div for CSS anchors.
        The container ref lets us overlay our flag on top.
      */}
      <div ref={containerRef} className="relative">
        <canvas
          ref={canvasRef}
          className="h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]"
          style={{ contain: 'layout paint size', opacity: 1 }}
        />
      </div>

      {/* Flag anchored to active marker via cobe's CSS anchor positioning */}
      <div
        key={demo.id}
        className="pointer-events-none"
        style={{
          position: 'absolute',
          positionAnchor: `--cobe-${demo.id}` as any,
          bottom: 'anchor(top)' as any,
          left: 'anchor(center)' as any,
          transform: 'translate(-50%, -4px)',
          opacity: isVisible ? `var(--cobe-visible-${demo.id}, 0)` : '0',
          transition: 'opacity 0.3s',
        }}
      >
        <span className="text-2xl drop-shadow-lg">{demo.flag}</span>
      </div>

      {/* Terminal */}
      <div
        className={`absolute -bottom-2 w-[300px] sm:w-[340px] overflow-hidden rounded-lg border border-white/[0.06] bg-black/60 font-mono text-[13px] shadow-2xl backdrop-blur-xl transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3.5 py-2">
          <span className="text-base leading-none">{demo.flag}</span>
          <span className="text-xs font-medium text-white/50">{demo.name}</span>
        </div>
        <div className="flex items-start gap-2 px-3.5 pt-2.5 pb-1">
          <span className="select-none text-white/30">&gt;</span>
          <span className="text-sky-400">
            {typedInput}
            {phase === 'typing' && (
              <span className="ml-0.5 inline-block h-[14px] w-[7px] animate-pulse bg-sky-400/80" />
            )}
          </span>
        </div>
        <div
          className={`px-3.5 pb-3 pt-0.5 text-emerald-400/90 transition-opacity duration-200 ${
            showOutput ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {demo.output}
        </div>
      </div>
    </div>
  )
}
