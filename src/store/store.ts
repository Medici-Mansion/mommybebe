import create from 'zustand'

type State = {
  correctAnswer: string
  setCorrectAnswer: (value: string) => void
}

export const useStore = create<State>((set) => ({
  correctAnswer: '',
  setCorrectAnswer: (value: string) => set({ correctAnswer: value }),
}))
