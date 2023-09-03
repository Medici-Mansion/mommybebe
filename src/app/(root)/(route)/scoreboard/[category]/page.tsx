'use client'

import ScoreForm from '../components/score-form'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

const ScoreBoardPage = () => {
  const router = useRouter()

  const handleNext = () => {
    router.push(`/`)
  }

  return (
    <div className={styles.scoreBoardContainer}>
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <h1 className={styles.title}>Scoreboard</h1>
        <h1 className={styles.subtitle}>Good job!</h1>
      </div>
      <div className={styles.formWrapper}>
        <ScoreForm />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.nextBtn} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ScoreBoardPage
