import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

import { FaExclamationTriangle } from 'react-icons/fa'

export default function NotFound() {
  return (
    <Layout title="Page not found | Next.js + Strapi">
      <div className={styles.error}>
        <h1><FaExclamationTriangle /> 404</h1>
        <p>Sorry, there's nothing here.</p>

        <Link href="/">Go back home</Link>
      </div>
    </Layout>
  )
}