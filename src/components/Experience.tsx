import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences, categories } from '../data/cv'
import type { Experience as ExpType } from '../data/cv'
import MagicCard from './MagicCard'

export default function Experience() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<ExpType | null>(null)

  const filtered =
    filter === 'all'
      ? experiences
      : experiences.filter((e) => e.category === filter)

  return (
    <section id="experience" className="section-pad relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[#00F0FF] text-sm tracking-[0.2em] uppercase mb-2 neon-text">
            Interactive Route
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Perjalanan Karier</h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
            Setiap titik adalah milestone di jalan raya profesional. Filter berdasarkan kategori.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id)
                window.dispatchEvent(new Event('portfolio-click'))
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                filter === cat.id
                  ? 'bg-[#00F0FF] text-[#0B0F19] shadow-[0_0_16px_rgba(0,240,255,0.4)]'
                  : 'glass text-white/70 hover:text-white hover:border-[#00F0FF]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 route-line -translate-x-1/2 opacity-60" />

          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((exp, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`relative flex items-start gap-6 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-[#0B0F19]"
                        style={{
                          background: exp.color,
                          boxShadow: `0 0 12px ${exp.color}`,
                        }}
                      />
                    </div>

                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
                        isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'
                      }`}
                    >
                      <MagicCard className="glass w-full rounded-2xl">
                        <button
                          onClick={() => {
                            setSelected(selected?.id === exp.id ? null : exp)
                            window.dispatchEvent(new Event('portfolio-click'))
                          }}
                          className="w-full rounded-[inherit] p-5 text-left transition-smooth group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00F0FF]"
                        >
                          <div className="flex items-center gap-2 mb-1.5 justify-between">
                            <span
                              className="text-xs font-semibold tracking-wider uppercase"
                              style={{ color: exp.color }}
                            >
                              {exp.period}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 capitalize">
                              {exp.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-white/60 mt-0.5">{exp.company}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {exp.vehicles.slice(0, 3).map((v) => (
                              <span
                                key={v}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-[#00F0FF]/10 text-[#00F0FF]/90"
                              >
                                {v}
                              </span>
                            ))}
                            {exp.vehicles.length > 3 && (
                              <span className="text-[11px] text-white/40">+{exp.vehicles.length - 3}</span>
                            )}
                          </div>
                        </button>
                      </MagicCard>

                      <AnimatePresence>
                        {selected?.id === exp.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <MagicCard className="mt-3 glass-strong rounded-xl p-4 text-sm text-white/70 leading-relaxed">
                              {exp.description}
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <p className="text-xs text-white/40 mb-1.5">Armada yang dikuasai:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.vehicles.map((v) => (
                                    <span
                                      key={v}
                                      className="text-[11px] px-2 py-1 rounded-md bg-[#FFB800]/10 text-[#FFB800]"
                                    >
                                      {v}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </MagicCard>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
