import axios from 'axios'
import { DallEResponse } from './dall-e'

export const uploadImage = async (dallEResponse: DallEResponse) => {
  const data = new FormData()
  data.append('file', dallEResponse.url)
  data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || '')

  // body에 FormData 객체를 넣어 전송
  const res = await axios.post<{ url: string; secure_url: string }>(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    data,
  )

  return { ...res.data, keyword: dallEResponse.keyword }
}
