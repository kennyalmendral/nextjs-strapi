import Link from 'next/link'

import { useState, useEffect, useContext } from 'react'

import { FaUser } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthContext from '@/context/AuthContext'

import Layout from '@/components/Layout'

import styles from '@/styles/Auth.module.css'

import { API_URL } from '@/config/index'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { register, error } = useContext(AuthContext)

  const registerUser = e => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.")
      
      return
    }

    register({ username, email, password })
  }

  return (
    <Layout title="Register | Next.js + Strapi">
      <div className={styles.auth}>
        <h1><FaUser /> Register</h1>

        <ToastContainer />

        <form onSubmit={registerUser}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password-confirmation">Password Confirmation</label>
            <input type="password" id="password-confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </div>

          <input type="submit" className="btn" value="Register" />

          <p>Already have an account? <Link href="/account/login">Login</Link></p>
        </form>
      </div>
    </Layout>
  )
}