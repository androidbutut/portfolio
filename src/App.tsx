import { useState, useEffect } from 'react'
import MainCanvas from './scenes/MainCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Vehicles from './components/Vehicles'
import Contact from './components/Contact'
import WhatsAppFloat from './components/WhatsAppFloat'
import AssetLoader from './components/AssetLoader'
import ScrollToTop from './components/ScrollToTop'
import InteractiveGridPattern from './components/InteractiveGridPattern'

const SECTION_IDS = ['hero', 'about', 'experience', 'skills', 'vehicles', 'contact']

export default function App() {
  const [waypoint, setWaypoint] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const activationLine = window.innerHeight * 0.35
      let current = 'hero'
      let wp = 0

      for (const sectionId of SECTION_IDS) {
        const section = document.getElementById(sectionId)
        if (section && section.getBoundingClientRect().top <= activationLine) {
          current = sectionId
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
          wp = 2 + Math.min(3, Math.floor(Math.max(0, -(document.getElementById('experience')?.getBoundingClientRect().top ?? 0)) / 400))
          break
        case 'skills':
          wp = 6
          break
        case 'vehicles':
          wp = 7
          break
        case 'contact':
          wp = 8
          break
        default:
          wp = 0
      }

      setWaypoint(wp)

    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { capture: true, passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <InteractiveGridPattern />
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
      <div className="floating-actions">
        <ScrollToTop />
        <WhatsAppFloat />
      </div>
    </div>
  )
}
