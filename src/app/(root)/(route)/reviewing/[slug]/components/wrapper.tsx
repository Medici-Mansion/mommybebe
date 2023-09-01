'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import styles from './wrapper.module.css'
import useSpeak from '@/hooks/use-speak'
import WordsApi from '@/service/words'
import WordCard from '../../components/word-card'
import Whisper from '@/app/components/Whisper'
import { useWhisper } from '@chengsokdara/use-whisper'

const Wrapper = ({ category }: { category: string }) => {
  const router = useRouter()

  const [progress, setProgress] = useState(1)
  const [isSpeakerClicked, setIsSpeakerClicked] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [localTranscript, setLocalTranscript] = useState<string | undefined>()

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
      router.push(`/`)
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
    setLocalTranscript(transcript.text)
  }, [transcript.text])

  useEffect(() => {
    setLocalTranscript(undefined)
  }, [progress])

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
          <WordCard
            image={data?.data.images[progress - 1]}
            transcript={localTranscript}
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
