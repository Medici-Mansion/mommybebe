import PrefetchQuery from '@/hydrate/prefetch-query'
import { CategoryApi } from '@/service'

import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <PrefetchQuery
      queries={[CategoryApi.CategoryQueries.queries.getCategories]}
    >
      {children}
    </PrefetchQuery>
  )
}

export default RootLayout
