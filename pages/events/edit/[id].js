import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { FaImage } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import moment from 'moment'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

import styles from '@/styles/Form.module.css'

import { API_URL } from '@/config/index'

export default function EditEvent({ event }) {
  const router = useRouter()
  
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description
  })

  const [showModal, setShowModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(event.image ? event.image.formats.thumbnail.url : null)
  
  const updateEvent = async (e) => {
    e.preventDefault();
    
    const hasEmptyFields = Object.values(values).some((el) => el === '')
    
    if (hasEmptyFields) {
      toast.error('Please fill up all the fields.')
    }
    
    const res = await fetch(`${API_URL}/events/${event.id}`, {
      method: 'PUT',
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

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${event.id}`)
    const data = await res.json()

    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }
  
  return (
    <Layout title="Edit event | Next.js + Strapi">
      <Link href="/events">&laquo; Go back</Link>
      
      <h1>Edit event</h1>
      
      <ToastContainer />
      
      <form onSubmit={updateEvent} className={styles.form}>
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
            <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={changeInput} />
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
        
        <input type="submit" className="btn" value="Update event" />
      </form>

      <h2>Event Image</h2>

      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}><FaImage /> Set Image</button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload eventId={event.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}
  
export async function getServerSideProps({ params: {id} }) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const event = await res.json()

  return {
    props: {
      event
    }
  }
}