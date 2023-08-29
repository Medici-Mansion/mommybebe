import styles from '../styles/CommonStyles.module.css'

const GeneratePage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <input type="text" className={styles.input} placeholder="Animal" />
      </div>
      <button className={styles.nextBtn}>Next</button>
    </>
  )
}

export default GeneratePage
