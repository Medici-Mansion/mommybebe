import styles from './layout.module.css'

const GenerateLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>{children}</main>
}

export default GenerateLayout
