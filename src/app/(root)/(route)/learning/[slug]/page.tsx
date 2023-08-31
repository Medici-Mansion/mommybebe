'use client'

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
      router.push(`/scoreboard`)
    }
  }

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>{params.slug}</h1>
        <div className={styles.progressBar}>
          <div
            style={{ width: `${68.6 * progress}px` }}
            className={styles.progressFill}
          ></div>
        </div>
      </div>
      <div className={styles.wordCardWrapper}>
        <WordCard />
        <button
          style={{
            backgroundColor: 'greenyellow',
          }}
          onClick={handleNextClick}
        >
          다음 카드로
        </button>
      </div>
    </div>
  )
}

export default WordCardpage
