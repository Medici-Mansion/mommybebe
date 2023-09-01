import SelectCategoryForm from './components/select-form'
import styles from './page.module.css'

const LearningPage = () => {
  return (
    <div className={styles.learningContainer}>
      <div>
        <h1 className={styles.title}>Word Reviewing</h1>
        <h1 className={styles.subtitle}>Select a category</h1>
      </div>
      <div className={styles.selectFormWrapper}>
        <SelectCategoryForm />
      </div>
    </div>
  )
}

export default LearningPage
