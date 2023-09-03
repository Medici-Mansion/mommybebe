'use client'
import styles from './word-form.module.css'
import { postImageBody } from '@/validation/image.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { instance } from '@/service'
import WordsApi from '@/service/words'

interface WordFormProps {
  defaultValues?: Partial<(typeof postImageBody)['_input']>
}

const MAX_WORD_COUNT = 5

const WordForm = ({ defaultValues }: WordFormProps) => {
  const router = useRouter()
  const isDeleted = useRef(false)
  const { handleSubmit, register, getValues, setFocus, setValue, setError } =
    useForm<(typeof postImageBody)['_input']>({
      resolver: zodResolver(postImageBody),
      defaultValues,
    })

  const queryClient = useQueryClient()
  const onValid = async (data: z.infer<typeof postImageBody>) => {
    const { categoryName, words } = data
    const filteredWords = words.filter((item) => !!item)
    // console.log(data)
    try {
      await instance.post('api/image', {
        categoryName: categoryName,
        words: filteredWords,
      })
      queryClient.invalidateQueries({
        queryKey:
          WordsApi.WordsQueries.queries.getImageByCategory(categoryName)
            .queryKey,
      })
      router.push(`/`)
    } catch (error) {
      setError('words', {
        type: 'required',
        message: 'Write five words',
      })
    }
  }

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
