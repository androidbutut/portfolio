import { motion } from 'framer-motion'
import { BusFront, Car, CarFront, Truck } from 'lucide-react'
import { vehicleCategories } from '../data/cv'
import VehicleCarousel3D from '../scenes/VehicleCarousel'
import MagicCard from './MagicCard'

const categoryIcons = {
  city: Car,
  executive: CarFront,
  commercial: Truck,
  heavy: BusFront,
}

export default function Vehicles() {
  return (
    <section id="vehicles" className="section-pad relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[#00F0FF] text-sm tracking-[0.2em] uppercase mb-2 neon-text">
            Virtual Garage
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Armada yang Dikuasai</h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
            Dari city car hingga heavy logistics — drag untuk putar, klik mobil untuk detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <VehicleCarousel3D />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {vehicleCategories.map((cat, i) => {
            const CategoryIcon = categoryIcons[cat.id as keyof typeof categoryIcons] ?? Car
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="h-full"
              >
                <MagicCard className="vehicle-card glass h-full rounded-2xl p-5 transition-smooth">
                  <div className="flex items-center gap-3 mb-3">
                    <CategoryIcon className="w-6 h-6 text-[#00F0FF]" />
                    <div>
                      <h3 className="font-semibold">{cat.name}</h3>
                      <p className="text-[11px] text-white/40">{cat.vehicles.length} unit</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.vehicles.map((v) => (
                      <span
                        key={v}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-white/75 border border-white/10"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </MagicCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
