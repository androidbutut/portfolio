import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'

export default function AssetLoader() {
  const { active, errors, item, progress } = useProgress()
  const [finished, setFinished] = useState(false)
  const hasErrors = errors.length > 0

  useEffect(() => {
    if (active || progress < 100 || hasErrors) {
      setFinished(false)
      return
    }

    const timeout = window.setTimeout(() => setFinished(true), 350)
    return () => window.clearTimeout(timeout)
  }, [active, hasErrors, progress])

  const currentAsset = item.split('/').pop() || 'Menyiapkan model kendaraan...'

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="asset-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role={hasErrors ? 'alert' : 'status'}
          aria-live="polite"
        >
          <div className="asset-loader__content">
            <p className="asset-loader__eyebrow">Portfolio 3D</p>
            <h1 className="asset-loader__title">
              {hasErrors ? 'Model belum termuat' : 'Menyiapkan perjalanan'}
            </h1>
            <p className="asset-loader__detail">
              {hasErrors ? 'Periksa koneksi lalu muat ulang halaman.' : currentAsset}
            </p>
            <div
              className="asset-loader__track"
              role="progressbar"
              aria-label="Progres pemuatan model 3D"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
            </div>
            <div className="asset-loader__status">
              <span>{hasErrors ? 'Pemuatan gagal' : 'Memuat model, tekstur, dan scene'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            {hasErrors && (
              <button
                className="asset-loader__retry"
                onClick={() => window.location.reload()}
              >
                Muat ulang
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
