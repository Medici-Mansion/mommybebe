import styles from '@/app/styles/CommonStyles.module.css'
import WordForm from './components/word-form'

type Props = {
  params: {
    slug: string
  }
}

const WordPage = ({ params }: Props) => {
  return (
    <div
      style={{
        // backgroundColor: 'lightblue',
        backgroundColor: '#f9eaf9;',
        padding: '3.6vh 0vh',
        height: '100vh',
      }}
    >
      <div
        style={
          {
            // backgroundColor: 'yellowgreen',
          }
        }
      >
        <h1
          style={{
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#A5A5A5',
            textAlign: 'center',
          }}
        >
          Generate words
        </h1>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '400',
            color: '#D770D7',
            textAlign: 'center',
          }}
        >
          Enter Five Words
        </h1>
        {/* <h1>{params.slug}123</h1> */}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}
      >
        <WordForm defaultValues={{ categoryName: params.slug }} />
      </div>
    </div>
  )
}

export default WordPage
