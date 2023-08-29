'use client'
import styles from '@/app/styles/CommonStyles.module.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface CategoryInput {
  category: string
}

const CategoryForm = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<CategoryInput>()
  const onValid = ({ category }: CategoryInput) => {
    router.push(`/generate/${category}`)
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit(onValid)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Enter category</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Animal"
          {...register('category', {
            required: 'Please Enter category.',
          })}
        />
      </div>
      <button className={styles.nextBtn}>Next</button>
    </form>
  )
}

export default CategoryForm
