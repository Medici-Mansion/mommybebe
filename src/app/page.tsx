import Image from 'next/image'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <main>
      <div className={styles.container}>
        <Image
          src="/logo.svg"
          className={styles.logo}
          alt="Logo 이미지"
          width={148}
          height={148}
          priority
        />
        <button className={`${styles.menuButton} ${styles.generate}`}>
          Generate Words
        </button>
        <button className={`${styles.menuButton} ${styles.learning}`}>
          Word Learning
        </button>
        <button className={`${styles.menuButton} ${styles.review}`}>
          Word Review
        </button>
      </div>
    </main>
  )
}
