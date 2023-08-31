'use client'
import { useRouter } from 'next/navigation'
import styles from './select-form.module.css'
import { useState } from 'react'

const SelectCategoryForm = () => {
  const router = useRouter()
  // const [selected, setSelected] = useState(false)

  const handleNextclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push(`/learning/animals`)
  }

  // const handleSelectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log('!')
  //   setSelected(true)
  // }

  return (
    <form>
      <div className={styles.selectBtnContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.selectBtn}>Animals</div>
          <div className={styles.unselectBtn}>Jobs</div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.unselectBtn}>Colors</div>
          <div className={styles.unselectBtn}>Fruits</div>
        </div>
      </div>
      <div className={styles.nextBtnWrapper}>
        <button className={styles.nextBtn} onClick={handleNextclick}>
          Next
        </button>
      </div>
    </form>
  )
}

export default SelectCategoryForm
