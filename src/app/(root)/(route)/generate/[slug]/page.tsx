import styles from '@/app/styles/CommonStyles.module.css'
import WordForm from './components/word-form'

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
        <WordForm defaultValues={{ categoryName: params.slug }} />
      </div>
    </>
  )
}

export default WordPage
