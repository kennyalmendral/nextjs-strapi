import { useRouter } from 'next/router'
import Link from 'next/link'

import qs from 'qs'

import Layout from '@/components/layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function Search({ events }) {
  const router = useRouter()

  return (
    <Layout title="Search results | Next.js + Strapi">
      <Link href="/events">&laquo; Go back</Link>

      <h1>Search results for <span style={{ color: 'red' }}>{router.query.term}</span></h1>

      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(event => (
        <EventItem event={event} key={event.id} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        {name_contains: term},
        {performers_contains: term},
        {description_contains: term},
        {venue_contains: term}
      ]
    }
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json()

  return {
    props: {
      events
    }
  }
}