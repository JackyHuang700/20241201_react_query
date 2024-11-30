import { } from 'react'
import styles from '@/components/nextPreviousBtn/nextPreviousBtn.module.css'
import { RootObject } from '@/app/page'

type Props = {
  page: number
  setNumPage: (page: ((prev: number) => number)) => void
  previous: RootObject['previous']
  next: RootObject['next']
  children?: React.ReactNode
}

const NextPreviousBtn = ({
  page,
  setNumPage,
  previous,
  next,
  children
}: Props) => {


  const getPreviousPage = (prev: number) => {
    let _prev = prev

    _prev = _prev <= 1 ? 1 : _prev = _prev - 1

    return _prev
  }

  const setPrevious = () => setNumPage(prev => getPreviousPage(prev))
  const setNext = () => setNumPage(prev => prev + 1)

  return (
    <div className="flex justify-center items-center gap-5 mb-3">
      {false && <p>{page}</p>}
      {previous && <button className={styles['btn-style']} onClick={setPrevious}>Previous</button>}
      {next && <button className={styles['btn-style']} onClick={setNext}>Next</button>}
      {children}
    </div>
  );
}

export default NextPreviousBtn