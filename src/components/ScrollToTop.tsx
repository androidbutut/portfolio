import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { getPageScrollTop, scrollPageToTop } from '../utils/scroll'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(getPageScrollTop() > 160)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    document.addEventListener('scroll', updateVisibility, { capture: true, passive: true })
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      document.removeEventListener('scroll', updateVisibility, true)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={scrollPageToTop}
          className="scroll-top glass"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
