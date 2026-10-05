import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { profile } from '../data/cv'
import MagicCard from './MagicCard'

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

          <MagicCard className="glass rounded-3xl p-8 md:p-10 inline-block w-full max-w-md">
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
          </MagicCard>
        </motion.div>
      </div>

      <div className="mt-20 text-center text-xs text-white/30">
        <p>© {new Date().getFullYear()} {profile.name}. Portfolio 3D Cybernetic Route.</p>
        <p className="mt-1">Built with React · Three.js · R3F</p>
        <p className="mt-2 max-w-3xl mx-auto leading-relaxed">
          Model 3D: <a className="underline hover:text-white/60" href="https://sketchfab.com/3d-models/indonesian-bus-ecoline-fda12812ab1147b79c1a6c7aa3adc5f8" target="_blank" rel="noopener noreferrer">Indonesian Bus Ecoline</a> by <a className="underline hover:text-white/60" href="https://sketchfab.com/agungkuncoro13021986" target="_blank" rel="noopener noreferrer">agungkuncoro13021986</a>; <a className="underline hover:text-white/60" href="https://sketchfab.com/3d-models/toyota-kijang-innova-zenix-2023-highpoly-c8e1bbc9292b4e198dba839c32f02fa9" target="_blank" rel="noopener noreferrer">Toyota Kijang Innova Zenix 2023</a> by <a className="underline hover:text-white/60" href="https://sketchfab.com/3dshowroom" target="_blank" rel="noopener noreferrer">3dShowroom</a>; <a className="underline hover:text-white/60" href="https://sketchfab.com/3d-models/toyota-vellfire-e1fedbdb2d2440679ae3be3c3310473d" target="_blank" rel="noopener noreferrer">Toyota Vellfire</a> by <a className="underline hover:text-white/60" href="https://sketchfab.com/Car2022" target="_blank" rel="noopener noreferrer">Mona x Supercars</a>; and <a className="underline hover:text-white/60" href="https://sketchfab.com/3d-models/mitsubishi-fuso-canter-truck-1570bf227af04c13ba0423dfccef5ae7" target="_blank" rel="noopener noreferrer">Mitsubishi Fuso Canter Truck</a> by <a className="underline hover:text-white/60" href="https://sketchfab.com/abdelrahmanbesso82" target="_blank" rel="noopener noreferrer">Abdelrahman Elbaqsawi</a>, CC BY 4.0. Mercedes-Benz E250 Estate by KOElkast1007, Sketchfab Standard License.
        </p>
      </div>
    </section>
  )
}
