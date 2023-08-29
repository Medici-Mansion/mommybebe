import styles from '../styles/CommonStyles.module.css'

import CategoryInput from '../components/CategoryInput'
import NextButton from '../components/NextButton'

const GeneratePage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <CategoryInput />
      </div>
      <div className={styles.nextBtn}>
        <NextButton />
      </div>
    </>
  )
}

export default GeneratePage
