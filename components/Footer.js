import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2021. All rights reserved.</p>
      <ul>
        <li>
          <Link href="/about">
            <a>About this website</a>
          </Link>
        </li>
      </ul>
    </footer>
  )
}