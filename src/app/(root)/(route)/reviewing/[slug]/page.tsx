import PrefetchQuery from '@/hydrate/prefetch-query'
import Wrapper from './components/wrapper'

import WordsApi from '@/service/words'

type Props = {
  params: {
    slug: string
  }
}

const WordCardpage = ({ params }: Props) => {
  return (
    <PrefetchQuery
      queries={[WordsApi.WordsQueries.queries.getImageByCategory(params.slug)]}
    >
      <Wrapper category={params.slug} />
    </PrefetchQuery>
  )
}

export default WordCardpage
