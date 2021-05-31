import Link from 'next/link'

import Layout from '@/components/layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Recent events</h1>

      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(event => (
        <EventItem event={event} key={event.id} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: {
      events
    },
    revalidate: 1
  }
}