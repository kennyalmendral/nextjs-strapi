import { useState } from 'react'

import { API_URL } from '@/config/index'

import styles from '@/styles/Form.module.css'

export default function ImageUpload({ eventId, imageUploaded, token }) {
  const [image, setImage] = useState(null)

  const uploadImage = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', eventId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (res.ok) {
      imageUploaded()
    }
  }

  const changeImage = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h4>Upload Event Image</h4>

      <form onSubmit={uploadImage}>
        <div className={styles.file}>
          <input type="file" onChange={changeImage} />
        </div>

        <input type="submit" className="btn" value="Upload" />
      </form>
    </div>
  )
}