'use client'
import useSpeak from '@/hooks/use-speak'
import { useEffect, useRef } from 'react'

const VoiceButton = () => {
  const ref = useRef<HTMLInputElement>(null)
  const { isReady, speak, getVoicesByLang, changeVoice, changeText } = useSpeak(
    {
      defaultVoice: (voices) => {
        return voices.get('en-US')?.[28]
      },
    },
  )

  return (
    <div>
      <input ref={ref} type="text" />
      <button
        onClick={() => {
          speak(ref.current?.value, { rate: 0.8 })
        }}
      >
        Speak
      </button>
    </div>
  )
}

export default VoiceButton
