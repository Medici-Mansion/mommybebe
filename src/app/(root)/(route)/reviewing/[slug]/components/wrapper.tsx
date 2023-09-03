'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import styles from './wrapper.module.css'
import WordsApi from '@/service/words'
import TestCard from '../../components/test-card'
import { useWhisper } from '@chengsokdara/use-whisper'
import { useStore } from '@/store/store'

const Wrapper = ({ category }: { category: string }) => {
  const router = useRouter()

  const [progress, setProgress] = useState(1)
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [localTranscript, setLocalTranscript] = useState<string | undefined>()
  const {
    correctAnswers,
    setCorrectAnswers,
    localTranscripts,
    setLocalTranscripts,
  } = useStore()

  const { data } = useQuery(
    WordsApi.WordsQueries.queries.getCategories(category),
  )

  const { recording, transcribing, transcript, startRecording, stopRecording } =
    useWhisper({
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

  const handleNextClick = () => {
    if (progress < 5) {
      setProgress((prev) => prev + 1)
    }

    if (progress === 5) {
      router.push(`/scoreboard`)
    }
  }

  const handleMic = () => {
    if (!recording) {
      handleStart() // 시작 버튼
      setIsSpeakerClicked(true) // 마이크 아이콘 클릭 시 활성화 표시
    } else {
      stopRecording()
      setIsSpeakerClicked(false) // 마이크 아이콘 비활성화 표시
    }
  }

  useEffect(() => {
    // progress가 변할 때마다 isSpeakerClicked 초기화
    setIsSpeakerClicked(false)
  }, [progress])

  useEffect(() => {
    if (transcript.text) {
      let finalTranscript = transcript.text

      // 텍스트가 끝에 .으로 나올 때 .을 제거
      if (finalTranscript.endsWith('.')) {
        finalTranscript = finalTranscript.slice(0, -1)
      }

      // 현재 progress에 따른 localTranscript 설정
      const updatedTranscripts = [...localTranscripts]
      updatedTranscripts[progress - 1] = finalTranscript
      setLocalTranscripts(updatedTranscripts)
    } else {
      const updatedTranscripts = [...localTranscripts]
      updatedTranscripts[progress - 1] = undefined
      setLocalTranscripts(updatedTranscripts)
    }
  }, [transcript.text, progress])

  useEffect(() => {
    setLocalTranscript(undefined)
  }, [progress])

  useEffect(() => {
    if (data?.data) {
      const updatedAnswers = [...correctAnswers]
      updatedAnswers[progress - 1] = data?.data.images[progress - 1]?.word
      setCorrectAnswers(updatedAnswers)
    }
  }, [data, progress])

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
        {data?.data && (
          <TestCard
            image={data?.data.images[progress - 1]}
            transcript={localTranscripts[progress - 1]}
            correctAnswer={correctAnswers[progress - 1]}
          />
        )}
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
