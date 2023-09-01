'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import styles from './select-form.module.css'

const SelectCategoryForm = () => {
  const router = useRouter()

  const handleNextclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push(`/reviewing/Animal`)
  }

  return (
    <form>
      <div className={styles.selectBtnContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.selectBtn}>Animals</div>
          <div className={styles.unselectBtn}>
            <Image src="/Lock.svg" width={32} height={32} alt="lock" />
            <p>Jobs</p>
          </div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.unselectBtn}>
            <Image src="/Lock.svg" width={32} height={32} alt="lock" />
            <p>Colors</p>
          </div>
          <div className={styles.unselectBtn}>
            <Image src="/Lock.svg" width={32} height={32} alt="lock" />
            <p>Fruits</p>
          </div>
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
