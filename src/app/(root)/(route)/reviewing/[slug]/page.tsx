import PrefetchQuery from '@/hydrate/prefetch-query'
import Wrapper from './components/wrapper'

import WordsApi from '@/service/words'

type Props = {
  params: {
    slug: string
  }
}

const WordCardpage = ({ params }: Props) => {
  return <Wrapper category={params.slug} />
}

export default WordCardpage
