import styles from './page.module.css'

const GeneratePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <input className={styles.input} placeholder="Enter a word" />
        <button className={styles.next}>Next</button>
      </div>
    </main>
  )
}

export default GeneratePage
