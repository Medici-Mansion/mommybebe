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

const DEFAULT = 'default' as const
type VoiceMapKey = Lang | typeof DEFAULT

export interface Voice extends SpeechSynthesisVoice {}

class TextSpeaker {
  private static instance: TextSpeaker
  private readonly voices = new Map<VoiceMapKey, Voice[]>()
  private utterance = new SpeechSynthesisUtterance()
  private selectedVoice: Voice = {
    default: true,
    lang: '',
    localService: false,
    name: '',
    voiceURI: '',
  }

  public static getInstance() {
    if (typeof window === 'undefined') throw new Error('')
    TextSpeaker.instance = new TextSpeaker()

    return TextSpeaker.instance
  }

  private constructor() {
    speechSynthesis.addEventListener('voiceschanged', this.initializeVoices)
  }

  getVoicesByLang(lang: VoiceMapKey) {
    return this.voices.get(lang)
  }

  changeText(text?: string) {
    this.utterance.text = text ?? this.utterance.text
  }

  speak() {
    speechSynthesis.speak(this.utterance)
  }

  dispose() {
    speechSynthesis.removeEventListener('voiceschanged', this.initializeVoices)
  }
  private initializeVoices() {
    const webVoices = window.speechSynthesis.getVoices()
    webVoices.forEach((voice) => {
      const lang = voice.lang as VoiceMapKey
      TextSpeaker.instance.voices.set(lang, [
        ...(TextSpeaker.instance.voices.get(lang) ?? []),
        voice,
      ])

      if (voice.default) {
        TextSpeaker.instance.voices.set('default', [voice])
        TextSpeaker.instance.utterance.voice = voice
        TextSpeaker.instance.selectedVoice = voice
      }
    })
  }
}
export default TextSpeaker
