'use client'

import { useQuery } from '@tanstack/react-query'
import styles from './word-card.module.css'
import CategoryQueries from '@/service/category/query'
import { useEffect, useState } from 'react'
import WordsQueries from '@/service/words/query'
import { instance } from '@/service'
import Image from 'next/image'

interface CategoryInput {
  category: string
}

interface WordCardProps {
  onWordChange: (word: string) => void
}

const WordCard = ({ onWordChange }: WordCardProps) => {
  const [data, setData] = useState<any>({})
  // const [name, setName] = useState('')

  useEffect(() => {
    const getImage = async () => {
      const response = await instance.get('/api/image?category=Animal', {})
      console.log(response)
      setData(response)
      onWordChange(response?.data?.data.images[1].word)
    }
    getImage()
  }, [onWordChange])

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image
          src={data?.data?.data.images[1].original_url}
          width={334}
          height={310}
          alt="이미지"
        />
      </div>
      <div className={styles.word}>{data?.data?.data.images[1].word}</div>
    </div>
  )
}

export default WordCard
