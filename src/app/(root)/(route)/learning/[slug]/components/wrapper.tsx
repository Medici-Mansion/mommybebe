'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import WordCard from '../../components/word-card'
import styles from './page.module.css'
import { useState } from 'react'
import useSpeak from '@/hooks/use-speak'
import { useQuery } from '@tanstack/react-query'
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

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>dfsf</h1>
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
      <div
        className={`${styles.speaker} ${
          isSpeakerClicked ? styles.speakerClicked : ''
        }`}
        onClick={handleSpeak}
      >
        <Image src="/speaker.svg" width={65} height={65} alt="스피커" />
      </div>
      <button
        style={{
          marginTop: '20px',
          backgroundColor: 'greenyellow',
        }}
        onClick={handleNextClick}
      >
        다음 카드로
      </button>
    </div>
  )
}

export default Wrapper
