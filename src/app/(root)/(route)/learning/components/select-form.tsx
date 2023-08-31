'use client'
import styles from '@/app/styles/CommonStyles.module.css'

const SelectCategoryForm = () => {
  return (
    <form>
      <div
        style={{
          backgroundColor: 'lightblue',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '48%',
              height: '160px',
              borderRadius: '1rem',
              backgroundColor: '#FF8D01',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '36px',
            }}
          >
            Animal
          </div>
          <div
            style={{
              width: '48%',
              height: '160px',
              borderRadius: '1rem',
              border: '2px solid #E1E1E1',
              background: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              fontSize: '36px',
            }}
          >
            Animal
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '48%',
              height: '160px',
              borderRadius: '1rem',
              backgroundColor: '#FF8D01',
              border: '2px solid #E1E1E1',
              background: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              fontSize: '36px',
            }}
          >
            Animal
          </div>
          <div
            style={{
              width: '48%',
              height: '160px',
              borderRadius: '1rem',
              backgroundColor: '#FF8D01',
              display: 'flex',
              border: '2px solid #E1E1E1',
              background: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              fontSize: '36px',
            }}
          >
            Animal
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundColor: 'black',
        }}
      >
        <button
          className={styles.nextBtn}
          style={{
            backgroundColor: 'FF8D01',
          }}
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default SelectCategoryForm
