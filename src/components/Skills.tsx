import { motion } from 'framer-motion'
import { skills } from '../data/cv'

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#00F0FF] text-sm tracking-[0.2em] uppercase mb-2 neon-text">
            Core Competencies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Keahlian Utama</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-7 group hover:border-[#00F0FF]/40 transition-smooth"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00F0FF] transition-colors">
                {skill.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
