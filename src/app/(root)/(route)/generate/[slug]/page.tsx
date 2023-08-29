import styles from '@/app/styles/CommonStyles.module.css'
import WordForm from './components/word-form'

type Props = {
  params: {
    slug: string
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter Five Words</h1>
        <h1 className={styles.title}>{params.slug}</h1>
        <WordForm defaultValues={{ categoryName: params.slug }} />
      </div>
    </div>
  )
}

export default WordPage
