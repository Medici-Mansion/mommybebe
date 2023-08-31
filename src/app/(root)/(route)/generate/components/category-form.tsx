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
    <div
      style={{
        backgroundColor: '#f9eaf9;',
        padding: '3.6vh 0vh',
        height: '100vh',
      }}
    >
      <form
        style={
          {
            // backgroundColor: 'ligtpink',
          }
        }
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div
            style={
              {
                // backgroundColor: 'yellowgreen',
                // height: '16vh',
              }
            }
          >
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: '400',
                color: '#A5A5A5',
                textAlign: 'center',
              }}
            >
              Generate words
            </h1>
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: '400',
                color: '#D770D7',
                textAlign: 'center',
              }}
            >
              Enter category
            </h1>
          </div>
          <div
            // style={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   flexGrow: ' 1',
            //   justifyContent: 'space-between',
            //   alignItems: 'center',
            // }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // backgroundColor: 'black',
            }}
          >
            <input
              type="text"
              placeholder="Animal"
              {...register('category', {
                required: 'Please Enter category.',
              })}
              style={{
                width: '88%',
                height: '10%',
                borderRadius: '1rem',
                border: '0.125rem solid #e1e1e1',
                backgroundColor: '#fff',
                padding: '1.25rem 1.25rem',
                fontSize: '3rem',
                marginBottom: '442px',
              }}
            />
            <button className={styles.nextBtn}>Next</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
