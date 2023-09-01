'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import styles from './score-form.module.css'
import WordsApi from '@/service/words'
import useSpeak from '@/hooks/use-speak'
import Image from 'next/image'

const ScoreForm = () => {
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)

  // 스피커 코드
  const { isReady, speak, getVoicesByLang } = useSpeak({
    defaultVoice: (voices) => {
      return voices.get('en-US')?.[24]
    },
  })

  const { data } = useQuery(
    WordsApi.WordsQueries.queries.getCategories('Animal'),
  )

  const handleSpeak = (word: string) => {
    if (isReady) {
      speak(word, { rate: 0.8, pitch: 1.2 })
    }
  }

  return (
    <div>
      {data?.data.images.map((image, index) => (
        <div key={index} className={styles.answerContainer}>
          <button
            className={styles.speaker}
            onClick={() => handleSpeak(image.word)}
          >
            <Image src="/answerspeak.svg" width={48} height={48} alt="스피커" />
          </button>
          <p className={styles.answer}>{image.word}</p>
          <div>
            <Image src="/correct.svg" width={48} height={48} alt="정답" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScoreForm
