import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '@/styles/Search.module.css'

export default function Search() {
  const router = useRouter()

  const [term, setTerm] = useState('')

  const searchEvents = (e) => {
    e.preventDefault()

    router.push(`/events/search?term=${term}`)

    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={searchEvents}>
        <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search events" />
      </form>
    </div>
  )
}