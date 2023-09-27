import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import handler from './api/items'
import Link from 'next/link'

export default function Home({data}) {

  const [items, setItems] = useState([])
  
  useEffect(()=>{
    setItems(data)
  }, [data])


  return (
    <div className="overflow-x-auto m-4">
      <table className="table table-sm table-zebra ">
        <thead>
          <tr className="text-lg border-t border-black">
            <td>Name</td>
            <td>Description</td>
            <td>Found At</td>
            <td>Found Date</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody className="text-lg text-zinc-50 font-medium">
          {data.map((d: any, index: number) => (
            <tr
              key={d.id}
              className={`text-sm 
                ${index % 2 === 0 ? 'odd:bg-blue-400 odd:text-white' : 'even:bg-white even:text-blue-500'} 
                hover:bg-blue-200 text-neutral-950`}
            >
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td className="">{d.foundAt}</td>
              <td>{formatDate(d.foundDate)}</td>
              <td>{d.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='fixed bottom-0 w-full' href="/insert">
        <button className='my-6 mx-8 float-right px-5 py-2 bg-blue-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none'>Insert</button>
      </Link>
    </div>
  )
}

function formatDate(dateString: string) {
  if (!dateString) {
    return '';
  }
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getServerSideProps() {
  try {
    const data = await handler()
    return {
      props: {data}
    }
  } catch (error) {
    return {
      props: {error: 'Failed to fetch data'}
    }
  }
}