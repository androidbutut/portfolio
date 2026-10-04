import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
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
                  <Phone className="w-5 h-5" />
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
                  <MapPin className="w-5 h-5" />
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
              <MessageCircle className="w-5 h-5" />
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
