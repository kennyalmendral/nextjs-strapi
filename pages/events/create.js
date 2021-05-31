import { useState } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import styles from '@/styles/Form.module.css'

import { API_URL } from '@/config/index'


export default function CreateEvent() {
  const router = useRouter()

  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  })

  const createEvent = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((el) => el === '')

    if (hasEmptyFields) {
      toast.error('Please fill up all the fields.')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      toast.error('Something went wrong.')
    } else {
      const event = await res.json()

      router.push(`/events/${event.slug}`)
    }
  }

  const changeInput = (e) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  return (
    <Layout title="Create new event | Next.js + Strapi">
      <Link href="/events">&laquo; Go back</Link>

      <h1>Create new event</h1>

      <ToastContainer />

      <form onSubmit={createEvent} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={changeInput} />
          </div>

          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" id="performers" name="performers" value={values.performers} onChange={changeInput} />
          </div>

          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" id="venue" name="venue" value={values.venue} onChange={changeInput} />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={values.address} onChange={changeInput} />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={values.date} onChange={changeInput} />
          </div>

          <div>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" name="time" value={values.time} onChange={changeInput} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={values.description} onChange={changeInput}></textarea>
        </div>

        <input type="submit" className="btn" value="Add event" />
      </form>
    </Layout>
  )
}