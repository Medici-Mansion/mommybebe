'use client'
import classNames from './word-form.module.scss'
import styles from '@/app/styles/CommonStyles.module.css'
import { postImageBody } from '@/validation/image.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import CategoryQueries from '@/service/category/query'
import { useRouter } from 'next/navigation'

interface WordFormProps {
  defaultValues?: Partial<(typeof postImageBody)['_input']>
}

const MAX_WORD_COUNT = 5

const WordForm = ({ defaultValues }: WordFormProps) => {
  const router = useRouter()
  const isDeleted = useRef(false)
  const [wordCount, setWordCount] = useState(1)
  const { handleSubmit, register, getValues, setFocus, setValue } = useForm<
    (typeof postImageBody)['_input']
  >({
    resolver: zodResolver(postImageBody),
    defaultValues,
  })

  const onValid = async (data: z.infer<typeof postImageBody>) => {
    const { categoryName, words } = data
    const filteredWords = words.filter((item) => !!item)
    console.log(data)
  }

  useEffect(() => {
    // 작업 뒤로 미루기
    setTimeout(() => setFocus(`words.${wordCount - 1}`))
  }, [setFocus, wordCount])

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        {Array.from({ length: 5 }, (_, count) => {
          const { onBlur, ...field } = register(`words.${count}`)
          return (
            <div
              key={count}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'black',
              }}
            >
              <input
                {...field}
                placeholder="Enter a word"
                onBlur={(event) => {
                  if (isDeleted.current) return
                  onBlur(event)
                }}
                style={{
                  width: '88%',
                  height: '10%',
                  borderRadius: '1rem',
                  border: '0.125rem solid #e1e1e1',
                  backgroundColor: '#fff',
                  padding: '1.25rem 1.25rem',
                  fontSize: '3rem',
                  marginBottom: '10px',
                }}
              />
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundColor: 'black',
        }}
      >
        <button className={styles.nextBtn}>Next</button>
      </div>
    </form>
  )
}

export default WordForm
