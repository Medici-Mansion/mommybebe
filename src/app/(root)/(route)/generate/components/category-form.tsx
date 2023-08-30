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
  const { register, handleSubmit } = useForm<CategoryInput>()
  const onValid = ({ category }: CategoryInput) => {
    router.push(`/generate/${category}`)
  }

  const { data } = useQuery(CategoryQueries.queries.getCategories)

  data?.data
  console.log('!!', data?.data)

  useEffect(() => {
    const postImage = async () => {
      const data = await instance.post('/api/image', {
        categoryName: 'Animal',
        words: ['monkey', 'pig', 'cat', 'dog', 'rabbit'],
      })
      console.log(data)
    }
    postImage()
  }, [])

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onValid)}>
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
