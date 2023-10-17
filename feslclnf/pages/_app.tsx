import '../styles/globals.css'
import Navbar from '../components/navbar'
import { DataProvider } from '../context/DataContext'
import { useSearchParams } from 'next/navigation'

function MyApp({ Component, pageProps }) {
  const searchParams = useSearchParams()
  return (
    <>
      {/* <Navbar/> */}
      <div>
        
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>

      </div>
    </>
  )
}

export default MyApp
