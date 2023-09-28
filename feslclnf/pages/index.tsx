import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, Fragment } from 'react'
import handler from './api/items'
import Link from 'next/link'
import { AiFillDelete } from 'react-icons/ai'
import { FaPencilAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Modal from '../components/modal'

export default function Home({data}) {

  const [items, setItems] = useState(data)
  const [open, setopen] = useState(false)
  const [id, setid] = useState("")
  const router = useRouter()
  
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteItem = async (id: String) => {
    console.log("delete");
    
    const resp = await fetch('/api/items/delete', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      })
    })
    console.log(id);
    const data = await resp.json()
    setopen(false)
    refreshData()
  }

  function handleOpen(id:any){
    setopen(true)
    setid(id)
    console.log("open");
    console.log(id);
  }
  
  useEffect(()=>{
    setItems(data)
  }, [items])


  return (
    <Fragment>

      <div className="overflow-x-auto m-4">
        <table className="table table-sm table-zebra ">
          <thead>
            <tr className="text-lg border-t border-black">
              <td className='text-center'>Name</td>
              <td className='text-center'>Description</td>
              <td className='text-center'>Found At</td>
              <td className='text-center'>Found Date</td>
              <td className='text-center'>Type</td>
              <td className='text-center'>Update</td>
              <td className='text-center'>Delete</td>
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
                <td className='text-center'>{d.name}</td>
                <td className='text-center'>{d.description}</td>
                <td className="text-center">{d.foundAt}</td>
                <td className='text-center'>{formatDate(d.foundDate)}</td>
                <td className='text-center'>{d.type}</td>
                <td className='text-center'><button className="btn btn-sm btn-outline btn-info"><FaPencilAlt/></button></td>
                <td className='text-center'><button onClick={()=>handleOpen(d.id)} className="btn btn-sm btn-outline btn-error"><AiFillDelete/></button></td>
                

              </tr>
            ))}
          </tbody>
        </table>
        <Link className='fixed bottom-0 w-full' href="/insert">
          <button className='my-6 mx-8 float-right px-5 py-2 bg-blue-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none'>Insert</button>
        </Link>
      </div>
      <Modal id={id} isOpen={open} onClose={()=>{setopen(false)}}>
        <div className='pt-8 pb-8'>
          <h3 className='text-xl font-semibold text-red-500 mb-4 text-center'>Are you sure, you want to delete this item?</h3>
          <div className='flex justify-center'>
            <div className='pt-4'>
              <button className='btn btn-error mr-4 text-white' onClick={()=>deleteItem(id)}>DELETE</button>
              <button className='btn btn-info ml-4 text-white' onClick={()=>{setopen(false)}}>CANCEL</button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
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