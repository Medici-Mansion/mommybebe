import WordForm from './components/word-form'
import styles from './page.module.css'

type Props = {
  params: {
    slug: string
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <h1 className={styles.title}>Generate words</h1>
        <h1 className={styles.subtitle}>Enter Five Words</h1>
        {/* <h1>{params.slug}123</h1> */}
      </div>
      <div className={styles.formWrapper}>
        <WordForm defaultValues={{ categoryName: params.slug }} />
      </div>
    </div>
  )
}

export default WordPage
