'use client'
import styles from './components/wrapper.module.css'

const Loading = () => {
  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>Animal</h1>
      </div>
      <div className={styles.wordCardWrapper}></div>
      <div className={styles.buttonContainer}>Loading</div>
    </div>
  )
}

export default Loading
