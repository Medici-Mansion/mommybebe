'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import WordCard from '../../components/word-card'
import styles from './wrapper.module.css'
import useSpeak from '@/hooks/use-speak'
import WordsApi from '@/service/words'

const Wrapper = ({ category }: { category: string }) => {
  const [progress, setProgress] = useState(1)
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)
  const { data } = useQuery(
    WordsApi.WordsQueries.queries.getCategories(category),
  )
  const router = useRouter()

  // 스피커 코드
  const { isReady, speak, getVoicesByLang } = useSpeak({
    defaultVoice: (voices) => {
      return voices.get('en-US')?.[24]
    },
  })

  const handleNextClick = () => {
    if (progress < 5) {
      setProgress((prev) => prev + 1)
    }

    if (progress === 5) {
      router.push(`/`)
    }
  }

  const handleSpeak = () => {
    if (isReady && data?.data.images[progress - 1]) {
      speak(data?.data.images[progress - 1].word, { rate: 0.8, pitch: 1.2 })
      setIsSpeakerClicked(true)
    }
  }

  useEffect(() => {
    // progress가 변할 때마다 isSpeakerClicked 초기화
    setIsSpeakerClicked(false)
  }, [progress])

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>Animal</h1>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              style={{ width: `${68.6 * progress}px` }}
              className={styles.progressFill}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.wordCardWrapper}>
        {data?.data && <WordCard image={data?.data.images[progress - 1]} />}
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.buttonWrapper} ${
            isSpeakerClicked ? styles.speakerClicked : ''
          }`}
          onClick={handleSpeak}
        >
          <Image src="/speaker.svg" width={65} height={65} alt="스피커" />
        </div>
        <button
          className={`${styles.buttonWrapper} ${styles.secondButton}`}
          onClick={handleNextClick}
        >
          <Image src="/Arrow_Right.svg" width={65} height={65} alt="next" />
        </button>
      </div>
    </div>
  )
}

export default Wrapper
