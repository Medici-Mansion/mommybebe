'use client'

import { useQuery } from '@tanstack/react-query'
import styles from './word-card.module.css'
import CategoryQueries from '@/service/category/query'
import { useEffect } from 'react'

interface CategoryInput {
  category: string
}

interface WordCardProps {
  onWordChange: (word: string) => void
}

const WordCard = ({ onWordChange }: WordCardProps) => {
  const { data } = useQuery(CategoryQueries.queries.getCategories)

  console.log('data!!', data?.data)

  // TODO : 단어 받아오는 useQuery 작성후 위의 카테고리 쿼리랑 교체
  useEffect(() => {
    if (data?.data) {
      onWordChange('Dog')
    }
  }, [data])

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}></div>
      <div className={styles.word}>Dog</div>
    </div>
  )
}

export default WordCard
