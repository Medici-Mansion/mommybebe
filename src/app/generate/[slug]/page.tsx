import styles from '../../styles/CommonStyles.module.css'

type Props = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Props) {
  return {
    title: `Words in ${params.slug} Category`,
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <h1>{params.slug}</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a word"
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a word"
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a word"
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a word"
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a word"
        />
      </div>
      <button className={styles.nextBtn}>Next</button>
    </>
  )
}

export default WordPage
