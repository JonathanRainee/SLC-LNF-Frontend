import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import handler from './api/items'

export default function Home({data}) {

  const [items, setItems] = useState([])
  // console.log('data: ', data);
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
        <tbody className="text-lg text-neutral-50 font-medium">
          {data.map((d: any, index: number) => (
            <tr
              key={d.id}
              className={`text-sm ${
                index % 2 === 0
                  ? 'odd:bg-blue-400 odd:text-white'
                  : 'even:bg-white even:text-blue-500'
              } hover:bg-blue-200 border-t border-black`}
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