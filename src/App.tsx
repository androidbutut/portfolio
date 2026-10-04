import { useState, useEffect, useRef } from 'react'
import MainCanvas from './scenes/MainCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Vehicles from './components/Vehicles'
import Contact from './components/Contact'
import WhatsAppFloat from './components/WhatsAppFloat'
import SoundToggle from './components/SoundToggle'
import AssetLoader from './components/AssetLoader'
import { useSound } from './hooks/useSound'

const SECTION_IDS = ['hero', 'about', 'experience', 'skills', 'vehicles', 'contact']

export default function App() {
  const [waypoint, setWaypoint] = useState(0)
  const { enabled, toggle, playWhoosh, playClick } = useSound()
  const lastSection = useRef('hero')

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35
      let current = 'hero'
      let wp = 0

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= scrollY) {
          current = SECTION_IDS[i]
          break
        }
      }

      switch (current) {
        case 'hero':
          wp = 0
          break
        case 'about':
          wp = 1
          break
        case 'experience':
          wp = 2 + Math.min(3, Math.floor((window.scrollY - (document.getElementById('experience')?.offsetTop || 0)) / 400))
          break
        case 'skills':
          wp = 4
          break
        case 'vehicles':
          wp = 5
          break
        case 'contact':
          wp = 6
          break
        default:
          wp = 0
      }

      setWaypoint(wp)

      if (current !== lastSection.current) {
        playWhoosh()
        lastSection.current = current
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [playWhoosh])

  useEffect(() => {
    const handler = () => playClick()
    window.addEventListener('portfolio-click', handler)
    return () => window.removeEventListener('portfolio-click', handler)
  }, [playClick])

  return (
    <div className="relative min-h-screen">
      <MainCanvas activeWaypoint={waypoint} />
      <AssetLoader />
      <div className="hud-layer relative">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Vehicles />
        <Contact />
      </div>
      <SoundToggle enabled={enabled} onToggle={toggle} />
      <WhatsAppFloat />
    </div>
  )
}
