type NextButtonProps = {
  onSave: () => void
}

const NextButton = ({ onSave }: NextButtonProps) => {
  return <button onClick={onSave}>Next</button>
}

export default NextButton
