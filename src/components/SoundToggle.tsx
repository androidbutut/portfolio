import { Volume2, VolumeX } from 'lucide-react'

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-28 right-28 z-50 w-11 h-11 rounded-full glass flex items-center justify-center transition-smooth hover:border-[#00F0FF]/50"
      aria-label={enabled ? 'Matikan suara' : 'Nyalakan suara'}
      title={enabled ? 'Sound ON' : 'Sound OFF'}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-[#00F0FF]" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50" />
      )}
    </button>
  )
}
