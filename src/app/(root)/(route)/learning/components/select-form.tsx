'use client'
// import styles from '@/app/styles/CommonStyles.module.css'
import styles from './select-form.module.css'

const SelectCategoryForm = () => {
  return (
    <form>
      <div className={styles.selectBtnContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.selectBtn}>Animal</div>
          <div className={styles.unselectBtn}>Animal</div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.unselectBtn}>Animal</div>
          <div className={styles.unselectBtn}>Animal</div>
        </div>
      </div>
      <div className={styles.nextBtnWrapper}>
        <button className={styles.nextBtn}>Next</button>
      </div>
    </form>
  )
}

export default SelectCategoryForm
