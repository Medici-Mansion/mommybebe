type Props = {
  params: {
    slug: string
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <div>
      <h1>{params.slug} 입력한 카테고리</h1>
    </div>
  )
}

export default WordPage
