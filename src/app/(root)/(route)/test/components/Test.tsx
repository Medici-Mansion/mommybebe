'use client'

import WordsApi from '@/service/words'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Card from './card'
import { AnimatePresence } from 'framer-motion'

const Test = () => {
  const { data } = useQuery(
    ['animal'],
    WordsApi.WrodsQueries.queries.getCategories('Animal'),
  )

  const [cardInfo, setCardInfo] = useState<{
    index: number
    direction: 'left' | 'right'
    isCorrect?: boolean
  }>({
    index: 0,
    direction: 'left',
    isCorrect: undefined,
  })

  return (
    <div style={{ height: '100%' }}>
      {data?.data?.images.length ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{ width: '50%', position: 'relative', aspectRatio: 1 / 1 }}
          >
            <AnimatePresence>
              {data?.data?.images.map((image, idx) => {
                return idx === cardInfo.index ? (
                  <Card
                    key={
                      data?.data?.images[cardInfo.index].id + cardInfo.direction
                    }
                    isCorrect={cardInfo.isCorrect}
                    isShow={idx === cardInfo.index}
                    direction={cardInfo.direction === 'left' ? 'left' : 'right'}
                    image={data?.data?.images[cardInfo.index].original_url}
                  />
                ) : null
              })}
            </AnimatePresence>
          </div>
          <button
            onClick={() => {
              if (cardInfo.index) {
                setCardInfo((prev) => ({
                  index: prev.index - 1,
                  direction: 'left',
                }))
              }
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              if (data.data.images.length - 1 !== cardInfo.index) {
                setCardInfo((prev) => ({
                  index: prev.index + 1,
                  direction: 'right',
                  isCorrect: true,
                }))
              }
            }}
          >
            next
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Test
