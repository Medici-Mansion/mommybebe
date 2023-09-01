import axios from 'axios'
const WORD_POSITION_KEY = 'WORD_POSITION_KEY'

const PROMPTS = [
  `art of very very cute and child-friendly illustration of ${WORD_POSITION_KEY}. render on a colourful gradient background.`,
  `3d art of a very very very cute ${WORD_POSITION_KEY} squishmallow design plush toy. 3d render on a colourful gradient background, deep shadows, studio photography`,
]

const getRandomPrompt = (word: string) => {
  const idx = (Math.random() * PROMPTS.length) >> 0
  PROMPTS[idx].replace(WORD_POSITION_KEY, word)
}

export function getImageFromDallE(keywords: string[], category?: string) {
  const promiseList = keywords.map((keyword) => {
    return new Promise<DallEResponse>(async (resolve, reject) => {
      try {
        const data = await axios.post<{ data: { url: string }[] }>(
          'https://api.openai.com/v1/images/generations',
          {
            prompt: getRandomPrompt(keyword),
            n: 1,
            size: '256x256',
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_KEY}`,
            },
          },
        )
        resolve({ keyword, url: data.data.data[0].url })
      } catch (err) {
        reject(err)
      }
    })
  })

  return Promise.all(promiseList)
}
export interface DallEResponse {
  keyword: string
  url: string
}
