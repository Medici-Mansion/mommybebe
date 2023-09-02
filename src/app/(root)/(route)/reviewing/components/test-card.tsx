'use client'

import Image from 'next/image'

import styles from './test-card.module.css'
import { ImageByCategory } from '@/@types/api'

interface WordCardProps {
  image?: ImageByCategory
  transcript?: string
  correctAnswer?: string
}

const TestCard = ({ image, transcript, correctAnswer }: WordCardProps) => {
  let answerStyle = {}

  if (transcript && correctAnswer) {
    answerStyle =
      transcript.toLowerCase() === correctAnswer.toLowerCase()
        ? { color: '#20D96B' }
        : { color: '#FF3932' }
  }

  return image ? (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image
          src={image?.original_url}
          width={334}
          height={310}
          placeholder="blur"
          blurDataURL={image?.original_url}
          alt="이미지"
        />
      </div>
      <div className={styles.word} style={answerStyle}>
        {transcript}
      </div>
    </div>
  ) : null
}

export default TestCard
