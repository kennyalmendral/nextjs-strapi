import Link from 'next/link'

import { useState, useEffect, useContext } from 'react'

import { FaUser } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import styles from '@/styles/Auth.module.css'

import { API_URL } from '@/config/index'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    <Layout title="Login | Next.js + Strapi">
      <div className={styles.auth}>
        <h1><FaUser /> Login</h1>

        <ToastContainer />

        <form onSubmit={login}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <input type="submit" className="btn" value="Login" />

          <p>Don't have an account? <Link href="/account/register">Register</Link></p>
        </form>
      </div>
    </Layout>
  )
}