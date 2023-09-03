import PrefetchQuery from '@/hydrate/prefetch-query'
import LearnApi from '@/service/learn'
import WordsApi from '@/service/words'
import { PropsWithChildren } from 'react'
type Props = {
  params: {
    category: string
  }
}
const ScoreBoardLayout = ({ children, params }: PropsWithChildren<Props>) => {
  return children
}

export default ScoreBoardLayout
