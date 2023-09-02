import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import VoiceTest from '@/app/components/VoiceTest'

export default function HomePage() {
  return (
    <main>
      <div className={styles.container}>
        {/* <VoiceTest /> */}
        <Image
          src="/sullivanLogo.svg"
          className={styles.logo}
          alt="Logo 이미지"
          width={148}
          height={148}
          priority
        />
        <Link
          href="/generate"
          className={`${styles.menuButton} ${styles.generate}`}
        >
          <button>Generate Words</button>
        </Link>
        <Link
          href="/learning"
          className={`${styles.menuButton} ${styles.learning}`}
        >
          <button>Word Learning</button>
        </Link>
        <Link
          href="/reviewing"
          className={`${styles.menuButton} ${styles.review}`}
        >
          <button>Word Review</button>
        </Link>
      </div>
    </main>
  )
}
