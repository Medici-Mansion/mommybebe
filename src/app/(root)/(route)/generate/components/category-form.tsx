'use client'
import { instance } from '@/service'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './category-form.module.css'

interface CategoryInput {
  category: string
}

const CategoryForm = () => {
  const router = useRouter()
  const { register, handleSubmit, setError } = useForm<CategoryInput>()

  const onValid = async ({ category }: CategoryInput) => {
    try {
      const response = await instance.post('/api/category', {
        name: category,
      })
      router.push(`/generate/${category}`)
      console.log('API Response:', response.data)
    } catch (error) {
      console.error('API Error:', error)
      setError('category', {
        type: 'required',
        message: 'Write category',
      })
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <div>
            <h1 className={styles.title}>Generate words</h1>
            <h1 className={styles.subtitle}>Enter category</h1>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Animal"
              {...register('category', {
                required: 'Please Enter category.',
              })}
              className={styles.input}
            />
            <button className={styles.nextBtn}>Next</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
