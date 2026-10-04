import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/cv'

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profil' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'vehicles', label: 'Armada' },
  { id: 'contact', label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = links.map((l) => document.getElementById(l.id))
      const scrollPos = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(links[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#FFB800] flex items-center justify-center font-bold text-[#0B0F19] text-sm">
            ES
          </div>
          <span className="font-semibold tracking-wide neon-text hidden sm:block">
            {profile.name.split(' ')[0]}
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                active === link.id
                  ? 'text-[#00F0FF] bg-[#00F0FF]/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5 text-[#00F0FF]" /> : <Menu className="w-5 h-5 text-[#00F0FF]" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-[#00F0FF]/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium ${
                    active === link.id ? 'text-[#00F0FF] bg-[#00F0FF]/10' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
