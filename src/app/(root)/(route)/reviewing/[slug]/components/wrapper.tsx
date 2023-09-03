'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import styles from './wrapper.module.css'
import WordsApi from '@/service/words'
import TestCard from '../../components/test-card'
import { useWhisper } from '@chengsokdara/use-whisper'
import { instance } from '@/service'

const Wrapper = ({ category }: { category: string }) => {
  const router = useRouter()

  const [progress, setProgress] = useState(1)
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const answerMap = useRef(new Map<string, boolean>()).current

  const { data } = useQuery(
    WordsApi.WordsQueries.queries.getReviewImageByCategory(category),
  )

  const { mutate: completeLearn } = useMutation(
    ['complete', 'learn', category],
    (body: {
      categoryName: string
      words: { id: string; isCorrect: boolean }[]
    }) => instance.post('/api/learn', body),
    {
      onSuccess() {
        router.push(`/scoreboard/${category}`)
      },
      onError(error, variables, context) {
        router.push(`/scoreboard/${category}`)
      },
    },
  )

  const { recording, transcript, startRecording, stopRecording } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  })

  const handleStart = () => {
    startRecording()

    // startRecording 후 3초 뒤에 stopRecording을 호출
    const id = setTimeout(() => {
      stopRecording()
      // 타이머 ID 상태를 클리어
      setTimerId(null)
    }, 3000) // 3초

    // 타이머 ID 상태를 설정
    setTimerId(id)
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되거나 다시 렌더링되기 전에 타이머를 클리어
    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [timerId])

  const onPostComplete = async () => {
    const answerKeys = [...answerMap.keys()]

    completeLearn({
      categoryName: category,
      words: answerKeys.map((id) => ({
        id,
        isCorrect: answerMap.get(id) || false,
      })),
    })
  }

  const handleNextClick = () => {
    if (currentImage) {
      answerMap.set(currentImage.id, currentImage.word === speakedText)
      transcript.text = ''
      if (progress < 5) {
        setProgress((prev) => prev + 1)
      }

      if (progress === 5) {
        // db저장 시작
        onPostComplete()
      }
    }
  }

  const handleMic = () => {
    if (!recording) {
      handleStart() // 시작 버튼
      setIsSpeakerClicked(true) // 마이크 아이콘 클릭 시 활성화 표시
    } else {
      stopRecording()
      setIsSpeakerClicked(false)
    }
  }

  useEffect(() => {
    setIsSpeakerClicked(false)
  }, [progress])

  const speakedText = useMemo(
    () => transcript.text?.replace('.', '').toLowerCase(),
    [transcript.text],
  )

  const currentImage = useMemo(
    () => data?.data[progress - 1],
    [data?.data, progress],
  )

  return (
    <div className={styles.cardContainer}>
      <div>
        <h1 className={styles.categoryTitle}>Animal</h1>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              style={{ width: `${68.6 * progress}px` }}
              className={styles.progressFill}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.wordCardWrapper}>
        {currentImage ? (
          <TestCard
            imagePath={currentImage.reviewUrl || currentImage.originalUrl}
            word={speakedText}
            isCorrect={currentImage.word === speakedText}
          />
        ) : null}
      </div>
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.buttonWrapper} ${
            isSpeakerClicked ? styles.speakerClicked : ''
          }`}
          onClick={handleMic}
        >
          <Image src="/mic.svg" width={65} height={65} alt="마이크" />
        </div>
        <button
          className={`${styles.buttonWrapper} ${styles.secondButton}`}
          onClick={handleNextClick}
        >
          <Image src="/Arrow_Right.svg" width={65} height={65} alt="next" />
        </button>
      </div>
    </div>
  )
}

export default Wrapper
