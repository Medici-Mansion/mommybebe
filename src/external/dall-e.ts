import axios from 'axios'
export function getImageFromDallE(keywords: string[], category?: string) {
  const promiseList = keywords.map((keyword) => {
    return new Promise<{ keyword: string; url: string }>(
      async (resolve, reject) => {
        try {
          const data = await axios.post<{ data: { url: string }[] }>(
            'https://api.openai.com/v1/images/generations',
            {
              prompt: `3d art of a very very very cute ${keyword} squishmallow design plush toy. 3d render on a colourful gradient background, deep shadows, studio photography`,
              n: 1,
              size: '256x256',
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
              },
            },
          )
          resolve({ keyword, url: data.data.data[0].url })
        } catch (err) {
          reject(err)
        }
      },
    )
  })

  return Promise.all(promiseList)
}
