import axios from 'axios'

export const uploadImage = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || '')

  // body에 FormData 객체를 넣어 전송
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    data,
  )

  return res.data
}
