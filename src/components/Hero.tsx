import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { profile } from '../data/cv'
import KineticText from './KineticText'
import MagicCard from './MagicCard'
import CityMarkers from './CityMarkers'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section-pad">
      <div className="hero-city-markers">
        <CityMarkers />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[#00F0FF] text-sm md:text-base tracking-[0.25em] uppercase mb-4 neon-text">
            Professional Driver Portfolio
          </p>
          <KineticText
            as="h1"
            text={profile.name}
            className="justify-center text-3xl sm:text-5xl md:text-7xl leading-tight mb-4 text-white"
          />
          <p className="text-lg md:text-xl text-[#FFB800] font-medium mb-3 gold-text">
            {profile.title}
          </p>
          <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg mb-10">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${profile.whatsapp}?text=Halo%20Endang%2C%20saya%20tertarik%20dengan%20jasa%20mengemudi%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00b8c4] text-[#0B0F19] font-semibold text-sm shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:shadow-[0_0_36px_rgba(0,240,255,0.6)] transition-smooth"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-[#00F0FF]/30 text-white font-medium text-sm hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-smooth"
            >
              Lihat Perjalanan Karier
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Tahun Pengalaman', value: '20+' },
            { label: 'Jenis Kendaraan', value: '15+' },
            { label: 'Kota Operasi', value: '3+' },
            { label: 'Klien Premium', value: '\u221E' },
          ].map((stat) => (
            <MagicCard key={stat.label} className="glass rounded-2xl px-4 py-5">
              <div className="text-2xl md:text-3xl font-bold text-[#00F0FF] neon-text">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </MagicCard>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#00F0FF]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
