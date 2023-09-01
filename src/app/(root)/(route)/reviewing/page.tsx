'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

const ReviewingPage = () => {
  const [progress, setProgress] = useState(1)

  return (
    <div className={styles.reviewContainer}>
      <div>
        <h1 className={styles.reviewTitle}>Animal</h1>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              style={{ width: `${68.6 * progress}px` }}
              className={styles.progressFill}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.wordCardWrapper}>{/* <WordCard /> */}</div>
      <div className={`${styles.speaker}`}>
        <Image src="/mic.svg" width={65} height={65} alt="스피커" />
      </div>
    </div>
  )
}

export default ReviewingPage
