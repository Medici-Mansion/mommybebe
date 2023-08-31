'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import WordCard from '../components/word-card'
import styles from './page.module.css'
import { useState } from 'react'

type Props = {
  params: {
    slug: string
  }
}

const WordCardpage = ({ params }: Props) => {
  const [progress, setProgress] = useState(1)
  const router = useRouter()

  const handleNextClick = () => {
    if (progress < 5) {
      setProgress((prev) => prev + 1)
    }

    if (progress === 5) {
      router.push(`/`)
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
        <WordCard />
      </div>
      <div className={styles.speaker}>
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
