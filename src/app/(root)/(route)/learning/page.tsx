import SelectCategoryForm from './components/select-form'

const LearningPage = () => {
  return (
    <div
      style={{
        // backgroundColor: 'lightblue',
        backgroundColor: '#FFF9E1;',
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
          Word learning
        </h1>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '400',
            color: '#FF8D01',
            textAlign: 'center',
          }}
        >
          Select a category
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: 'red',
        }}
      >
        <SelectCategoryForm />
      </div>
    </div>
  )
}

export default LearningPage
