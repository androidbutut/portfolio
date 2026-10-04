import { profile } from '../data/cv'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}?text=Halo%20Endang%2C%20saya%20tertarik%20dengan%20jasa%20mengemudi%20Anda`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
