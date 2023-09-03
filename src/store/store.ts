import create from 'zustand'

type State = {
  correctAnswers: string[]
  localTranscripts: (string | undefined)[]
  setCorrectAnswers: (values: string[]) => void
  setLocalTranscripts: (values: (string | undefined)[]) => void
}

export const useStore = create<State>((set) => ({
  correctAnswers: [],
  localTranscripts: [],
  setCorrectAnswers: (values: string[]) => set({ correctAnswers: values }),
  setLocalTranscripts: (values: (string | undefined)[]) =>
    set({ localTranscripts: values }),
}))
