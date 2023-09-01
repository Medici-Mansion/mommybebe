'use client'

import Image from 'next/image'

import styles from './word-card.module.css'
import { ImageByCategory } from '@/@types/api'

interface WordCardProps {
  image?: ImageByCategory
  transcript?: string
}

const WordCard = ({ image, transcript }: WordCardProps) => {
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
      <div className={styles.word}>{transcript}</div>
    </div>
  ) : null
}

export default WordCard
