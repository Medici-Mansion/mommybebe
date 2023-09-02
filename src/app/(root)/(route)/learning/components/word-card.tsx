'use client'

import { useQuery } from '@tanstack/react-query'
import styles from './word-card.module.css'
import CategoryQueries from '@/service/category/query'
import { useEffect, useState } from 'react'
import WordsQueries from '@/service/words/query'
import { instance } from '@/service'
import Image from 'next/image'
import { ImageByCategory } from '@/@types/api'

interface CategoryInput {
  category: string
}

interface WordCardProps {
  image?: ImageByCategory
}

const WordCard = ({ image }: WordCardProps) => {
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
      <div className={styles.word}>{image.word}</div>
    </div>
  ) : null
}

export default WordCard
