import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

import { API_URL, PER_PAGE } from '@/config/index'

export default function Events({ events, page, total }) {
  return (
    <Layout title="Events | Next.js + Strapi">
      <h1>Events</h1>

      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(event => (
        <EventItem event={event} key={event.id} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page: +page or parseInt(page)
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch/count total events
  const fetchTotalEvents = await fetch(`${API_URL}/events/count`)
  const totalEvents = await fetchTotalEvents.json()

  // Fetch events
  const fetchEvents = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await fetchEvents.json()

  return {
    props: {
      events,
      page: +page,
      total: totalEvents
    }
  }
}