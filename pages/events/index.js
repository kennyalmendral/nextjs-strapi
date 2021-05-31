import Layout from '@/components/layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function Events({ events }) {
  return (
    <Layout title="Events | Next.js + Strapi">
      <h1>Events</h1>

      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(event => (
        <EventItem event={event} key={event.id} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()

  return {
    props: {
      events
    },
    revalidate: 1
  }
}