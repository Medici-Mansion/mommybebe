'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

interface useSpeakProps {
  defaultVoice?: (voices: Map<VoiceMapKey, Voice[]>) => Voice | undefined
}
interface useSpeakPropsT {
  defaultVoice?: Voice
}
function useSpeak(props?: useSpeakPropsT): UseSpeakReturn
function useSpeak(props?: useSpeakProps): UseSpeakReturn

function useSpeak({
  defaultVoice,
}: useSpeakPropsT | useSpeakProps = {}): UseSpeakReturn {
  const [isReady, setIsReady] = useState(false)

  const voices = useRef(new Map<VoiceMapKey, Voice[]>()).current
  const utterance = useRef(
    typeof window !== 'undefined'
      ? new window.SpeechSynthesisUtterance()
      : ({} as SpeechSynthesisUtterance),
  ).current
  const selectedVoice = useRef<Voice>({
    default: true,
    lang: '',
    localService: false,
    name: '',
    voiceURI: '',
  })
  const changeVoice = useCallback(
    (voice: Voice) => {
      if (utterance) {
        utterance.voice = voice
      }
      selectedVoice.current = voice
    },
    [utterance],
  )

  const initializeVoices = useCallback(() => {
    const webVoices = window.speechSynthesis.getVoices()
    if (!webVoices.length) return
    webVoices.forEach((voice) => {
      const lang = voice.lang as VoiceMapKey
      voices.set(lang, [...(voices.get(lang) ?? []), voice])

      if (voice.default) {
        voices.set('default', [voice])
      }
    })
    changeVoice(
      !defaultVoice
        ? voices.get('default')![0]
        : typeof defaultVoice === 'function'
        ? defaultVoice(voices) ?? voices.get('default')![0]
        : defaultVoice,
    )
    setIsReady(true)
  }, [defaultVoice, changeVoice, voices])

  const getVoicesByLang = useCallback(
    (lang: VoiceMapKey) => {
      return voices.get(lang)
    },
    [voices],
  )

  const changeText = useCallback(
    (text?: string) => {
      if (utterance) {
        utterance.text = text ?? utterance.text
      }
    },
    [utterance],
  )

  const speak = useCallback(
    (
      text?: string,
      options?: Partial<{
        [key in speakOptionKey]: SpeechSynthesisUtterance[key]
      }>,
    ) => {
      if (options) {
        const parsedOptionKeys = Object.entries(options) as [
          speakOptionKey,
          SpeechSynthesisUtterance[speakOptionKey],
        ][]
        parsedOptionKeys.forEach(([key, value]) => {
          if (utterance) {
            utterance[key] = value
          }
        })
      }
      changeText(text)
      if (utterance) speechSynthesis.speak(utterance)
    },
    [changeText, utterance],
  )

  useEffect(() => {
    if (!isReady) initializeVoices()
    speechSynthesis.addEventListener('voiceschanged', initializeVoices)
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', initializeVoices)
    }
  }, [initializeVoices, isReady])
  return {
    isReady,
    changeVoice,
    getVoicesByLang,
    changeText,
    speak,
  }
}

interface UseSpeakReturn {
  isReady: boolean
  changeVoice: (selectedVoice: Voice) => void
  getVoicesByLang: (lang: VoiceMapKey) => Voice[] | undefined
  changeText: (text?: string) => void
  speak: (
    text?: string,
    options?: Partial<{
      [key in speakOptionKey]: SpeechSynthesisUtterance[key]
    }>,
  ) => void
}

export default useSpeak

type speakOptionKey = keyof Pick<
  SpeechSynthesisUtterance,
  'volume' | 'rate' | 'pitch'
>

type VoiceMapKey = Lang | 'default'
export interface Voice extends SpeechSynthesisVoice {}
type Lang =
  | 'ko-KR'
  | 'en-US'
  | 'it-IT'
  | 'sv-SE'
  | 'fr-CA'
  | 'ms-MY'
  | 'de-DE'
  | 'en-US'
  | 'en-US'
  | 'en-US'
  | 'en-US'
  | 'en-US'
  | 'he-IL'
  | 'en-US'
  | 'id-ID'
  | 'en-GB'
  | 'bg-BG'
  | 'en-US'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'nl-BE'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'en-US'
  | 'en-US'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'en-US'
  | 'ro-RO'
  | 'fr-FR'
  | 'pt-PT'
  | 'en-US'
  | 'th-TH'
  | 'en-AU'
  | 'en-US'
  | 'ja-JP'
  | 'hr-HR'
  | 'sk-SK'
  | 'hi-IN'
  | 'uk-UA'
  | 'vi-VN'
  | 'pt-BR'
  | 'ar-001'
  | 'hu-HU'
  | 'zh-TW'
  | 'el-GR'
  | 'ru-RU'
  | 'en-IE'
  | 'es-ES'
  | 'ca-ES'
  | 'nb-NO'
  | 'en-US'
  | 'es-MX'
  | 'en-US'
  | 'en-US'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'it-IT'
  | 'pt-BR'
  | 'en-IN'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'en-US'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'da-DK'
  | 'fi-FI'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fi-FI'
  | 'fr-CA'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-BR'
  | 'zh-HK'
  | 'en-ZA'
  | 'fr-FR'
  | 'zh-CN'
  | 'en-US'
  | 'en-US'
  | 'nl-NL'
  | 'tr-TR'
  | 'en-US'
  | 'pl-PL'
  | 'cs-CZ'
  | 'de-DE'
  | 'en-US'
  | 'en-GB'
  | 'en-GB'
  | 'es-ES'
  | 'es-US'
  | 'fr-FR'
  | 'hi-IN'
  | 'id-ID'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-BR'
  | 'ru-RU'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW'
