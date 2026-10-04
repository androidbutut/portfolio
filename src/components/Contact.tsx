import { motion } from 'framer-motion'
import { profile } from '../data/cv'

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative pb-32">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#00F0FF] text-sm tracking-[0.2em] uppercase mb-2 neon-text">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap di Jalan Bersama Anda</h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Butuh driver profesional untuk eksekutif, logistik, atau perjalanan pribadi?
            Hubungi langsung via WhatsApp.
          </p>

          <div className="glass rounded-3xl p-8 md:p-10 inline-block w-full max-w-md">
            <div className="space-y-5 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/15 flex items-center justify-center text-[#00F0FF]">
                  📱
                </div>
                <div>
                  <p className="text-xs text-white/40">Telepon / WhatsApp</p>
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-white hover:text-[#00F0FF] transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFB800]/15 flex items-center justify-center text-[#FFB800]">
                  📍
                </div>
                <div>
                  <p className="text-xs text-white/40">Lokasi Operasi</p>
                  <p className="text-white font-medium">{profile.location}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${profile.whatsapp}?text=Halo%20Endang%2C%20saya%20ingin%20menghubungi%20dari%20portfolio%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold shadow-[0_4px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.5)] transition-smooth"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center text-xs text-white/30">
        <p>© {new Date().getFullYear()} {profile.name}. Portfolio 3D Cybernetic Route.</p>
        <p className="mt-1">Built with React · Three.js · R3F</p>
      </div>
    </section>
  )
}
