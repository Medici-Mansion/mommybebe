'use client'
import { useState } from 'react'
import styles from '../styles/CommonStyles.module.css'

const CategoryInput = () => {
  const [category, setCategory] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  return (
    <input
      placeholder="Animal"
      className={styles.input}
      value={category}
      onChange={handleChange}
    />
  )
}

export default CategoryInput
