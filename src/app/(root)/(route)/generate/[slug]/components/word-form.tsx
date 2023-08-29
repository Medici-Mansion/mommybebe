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

interface WordFormProps {
  defaultValues?: Partial<(typeof postImageBody)['_input']>
}

const MAX_WORD_COUNT = 5

const WordForm = ({ defaultValues }: WordFormProps) => {
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
    <form onSubmit={handleSubmit(onValid)} className={classNames.form}>
      <div className={classNames.words_wrapper}>
        <AnimatePresence>
          {[...Array(wordCount).keys()].map((count) => {
            const { onBlur, ...field } = register(`words.${count}`)
            return (
              <motion.div
                key={count}
                className={classNames.input_wrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  {...field}
                  placeholder="Enter a word"
                  onBlur={(event) => {
                    if (isDeleted.current) return
                    if (wordCount < MAX_WORD_COUNT && count === wordCount - 1) {
                      const { words } = getValues()
                      if (words.filter((item) => !!item).length === wordCount)
                        setWordCount((prev) => prev + 1)
                    } else {
                      onBlur(event)
                    }
                  }}
                />
                <button
                  onMouseEnter={() => (isDeleted.current = true)}
                  onMouseLeave={() => (isDeleted.current = false)}
                  onClick={() => {
                    setValue(`words.${count}`, '')
                    setWordCount((prev) => prev - 1)
                  }}
                  style={wordCount > 1 ? {} : { visibility: 'hidden' }}
                >
                  <XCircle />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <button className={styles.nextBtn}>Next</button>
    </form>
  )
}

export default WordForm
