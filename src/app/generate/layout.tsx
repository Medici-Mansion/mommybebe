import styles from './layout.module.css'

const GenerateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Enter category</h1>
          {children}
        </div>
        <button className={styles.button}>Next</button>
      </main>
    </>
  )
}

export default GenerateLayout
