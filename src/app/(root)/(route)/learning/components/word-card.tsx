'use client'

import { useQuery } from '@tanstack/react-query'
import styles from './word-card.module.css'
import CategoryQueries from '@/service/category/query'

interface CategoryInput {
  category: string
}

const WordCard = () => {
  const { data } = useQuery(CategoryQueries.queries.getCategories)

  console.log('data!!', data?.data)

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}></div>
      <div className={styles.word}>Dog</div>
    </div>
  )
}

export default WordCard
