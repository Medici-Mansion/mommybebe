'use client'

import Image from 'next/image'

import styles from './test-card.module.css'

interface WordCardProps {
  imagePath: string
  word?: string
  isCorrect: boolean
}

const TestCard = ({ imagePath, word, isCorrect }: WordCardProps) => {
  return imagePath ? (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image
          src={imagePath}
          width={334}
          height={310}
          placeholder="blur"
          blurDataURL={imagePath}
          alt="이미지"
        />
      </div>
      <div
        className={styles.word}
        style={{ color: isCorrect ? '#20D96B' : '#FF3932' }}
      >
        {word}
      </div>
    </div>
  ) : null
}

export default TestCard
