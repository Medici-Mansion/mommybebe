'use client'
import styles from './word-form.module.css'
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
import { instance } from '@/service'

interface WordFormProps {
  defaultValues?: Partial<(typeof postImageBody)['_input']>
}

const MAX_WORD_COUNT = 5

const WordForm = ({ defaultValues }: WordFormProps) => {
  const router = useRouter()
  const isDeleted = useRef(false)
  const [wordCount, setWordCount] = useState(1)
  const { handleSubmit, register, getValues, setFocus, setValue, setError } =
    useForm<(typeof postImageBody)['_input']>({
      resolver: zodResolver(postImageBody),
      defaultValues,
    })

  const onValid = async (data: z.infer<typeof postImageBody>) => {
    const { categoryName, words } = data
    const filteredWords = words.filter((item) => !!item)
    // console.log(data)
    try {
      const response = await instance.post('api/image', {
        categoryName: categoryName,
        words: filteredWords,
      })
      console.log('res', response.data)
      router.push(`/`)
    } catch (error) {
      setError('words', {
        type: 'required',
        message: 'Write five words',
      })
    }
  }

  useEffect(() => {
    // 작업 뒤로 미루기
    setTimeout(() => setFocus(`words.${wordCount - 1}`))
  }, [setFocus, wordCount])

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        {Array.from({ length: MAX_WORD_COUNT }, (_, count) => {
          const { onBlur, ...field } = register(`words.${count}`)
          return (
            <div key={count} className={styles.inputWrapper}>
              <input
                {...field}
                placeholder="Enter a word"
                onBlur={(event) => {
                  if (isDeleted.current) return
                  onBlur(event)
                }}
                className={styles.input}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.nextBtn}>Next</button>
      </div>
    </form>
  )
}

export default WordForm
