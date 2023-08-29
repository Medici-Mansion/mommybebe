'use client'
import { useState } from 'react'
import styles from '../styles/CommonStyles.module.css'

import CategoryInput from '../components/CategoryInput'
import NextButton from '../components/NextButton'

const GeneratePage = () => {
  const [category, setCategory] = useState('')

  const saveCategory = async () => {
    const response = await fetch(`http://localhost:3000/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: category }),
    })
    const result = await response.json()

    if (response.ok) {
      alert('Category 생성 성공')
    } else {
      alert(result.error.message)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <CategoryInput category={category} setCategory={setCategory} />
      </div>
      <div className={styles.nextBtn}>
        <NextButton onSave={saveCategory} />
      </div>
    </>
  )
}

export default GeneratePage
