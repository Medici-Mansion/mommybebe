import styles from '../../styles/CommonStyles.module.css'

type Props = {
  params: {
    slug: string
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <h1>{params.slug} 입력한 카테고리</h1>
      </div>
      <button className={styles.nextBtn}>Next</button>
    </>
  )
}

export default WordPage
