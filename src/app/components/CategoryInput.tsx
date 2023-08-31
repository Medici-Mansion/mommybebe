import styles from '../styles/CommonStyles.module.css'

type CategoryInputProps = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryInput = ({ category, setCategory }: CategoryInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  return (
    <input
      placeholder="Animal"
      className={styles.input}
      value={category}
      onChange={handleChange}
    />
  )
}

export default CategoryInput
