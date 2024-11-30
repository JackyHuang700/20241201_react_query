import React from 'react'
import styles from '@/components/pageData/pageData.module.css'
import { Result } from '@/app/page'

type Props = {
  page: Result
}

const PageData = ({
  page,
}: Props) => {
  return (
    <div className='my-2 rounded-lg bg-black p-3'>
      <h3 className='text-amber-400 text'>{page.name}</h3>
      <div className='text-gray-400'>
        <PageDataText title='population' value={page.population} />
        <PageDataText title='terrain' value={page.terrain} />
      </div>
      {false && JSON.stringify(page)}
    </div>
  )
}

export default PageData


type PageDataTextProps = {
  title: string
  value: string
}
const PageDataText = ({
  title,
  value
}:
  PageDataTextProps
) => {
  return (<p className="">
    <span>{title}</span>
    <span> - </span>
    <span>{value}</span>
  </p>)
}