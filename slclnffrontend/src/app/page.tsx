import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-4xl font-bold underline">
        Hello world!
      </h1>
      <button className="btn">Button</button>
    </main>
  )
}
