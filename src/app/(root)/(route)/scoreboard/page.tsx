import ScoreForm from './components/score-form'
import styles from './page.module.css'

const ScoreBoardPage = () => {
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
        <button className={styles.nextBtn}>Next</button>
      </div>
    </div>
  )
}

export default ScoreBoardPage
