import { motion } from 'framer-motion'
import { profile, education } from '../data/cv'

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00F0FF] text-sm tracking-[0.2em] uppercase mb-2 neon-text">Profil</p>
          <h2 className="text-3xl md:text-4xl font-bold">Mengenal Lebih Dekat</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#FFB800] flex items-center justify-center text-2xl font-bold text-[#0B0F19]">
                ES
              </div>
              <div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-[#00F0FF] text-sm">{profile.title}</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <span className="text-[#FFB800] w-5">📍</span>
                <span>{profile.location}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB800] w-5">🎂</span>
                <span>{profile.birth}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB800] w-5">📱</span>
                <a href={`tel:${profile.phone}`} className="hover:text-[#00F0FF] transition-colors">
                  {profile.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB800] w-5">🕌</span>
                <span>{profile.religion}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="text-[#00F0FF]">🎓</span> Pendidikan
            </h3>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-[#00F0FF]/30">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  <p className="font-medium text-white">{edu.school}</p>
                  <p className="text-sm text-white/50 mt-0.5">{edu.years}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/40 leading-relaxed">
              Latar belakang otomotif dari SMK ICB Bandung menjadi fondasi kuat dalam memahami mesin dan kendaraan sejak dini.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
