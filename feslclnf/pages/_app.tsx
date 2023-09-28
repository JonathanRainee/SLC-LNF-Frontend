import '../styles/globals.css'
import Navbar from '../components/navbar'
import { DataProvider } from '../context/DataContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar/>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </>
  )
}

export default MyApp
