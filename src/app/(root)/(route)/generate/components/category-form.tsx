'use client'
import styles from '@/app/styles/CommonStyles.module.css'
import { instance } from '@/service'
import CategoryQueries from '@/service/category/query'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
    <form className={styles.wrapper} onSubmit={handleSubmit(onValid)}>
      <div className={styles.container}>
        <h1>Enter category</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: ' 1',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Animal"
            {...register('category', {
              required: 'Please Enter category.',
            })}
          />
          <button className={styles.nextBtn}>Next</button>
        </div>
      </div>
    </form>
  )
}

export default CategoryForm
