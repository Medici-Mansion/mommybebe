'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import WordCard from '../components/word-card'
import styles from './page.module.css'
import { useState } from 'react'
import useSpeak from '@/hooks/use-speak'

type Props = {
  params: {
    slug: string
  }
}

const WordCardpage = ({ params }: Props) => {
  const [progress, setProgress] = useState(1)
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)
  const [currentWord, setCurrentWord] = useState('')

  const router = useRouter()

  // 스피커 코드
  const { isReady, speak } = useSpeak({
    defaultVoice: (voices) => {
      return voices.get('en-US')?.[28]
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
    if (isReady) {
      speak(currentWord, { rate: 0.8 })
      setIsSpeakerClicked(true)
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>{params.slug}</h1>
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
        <WordCard onWordChange={setCurrentWord} />
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

export default WordCardpage
