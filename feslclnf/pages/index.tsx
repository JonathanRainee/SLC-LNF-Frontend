import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, Fragment } from 'react'
import handler from './api/items'
import Link from 'next/link'
import { AiFillDelete, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaPencilAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Modal from '../components/modal'
import { useData, useIsAdmin } from '../context/DataContext'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/navbar'
import PaginationControls from '../components/PaginationController'

export default function Home({d}) {

  const [items, setItems] = useState(d)
  const [open, setopen] = useState(false)
  const [id, setid] = useState("")
  const router = useRouter()
  const { data, setData } = useData()
  const { isAdmin, setIsAdmin } = useIsAdmin()
  const { name, type, room } = router.query;

  const newValue = isAdmin;
  const nameFromURL = Array.isArray(name) ? name[0] : name || '';
  const typeFromURL = Array.isArray(type) ? type[0] : type || '';
  const roomFromURL = Array.isArray(room) ? room[0] : room || '';

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

  function logOut (){
    setIsAdmin(false)
    localStorage.clear();
  }

  function handleOpen(id:any){
    setopen(true)
    setid(id)
  }

  function handleUpdate(d:any){
    setData(d)
  }
  
  async function handleDetail(d:any){
    await setData(d)
    router.push('/detail')
  }

  useEffect(()=>{
    setItems(d)
  }, [items])

  useEffect(() => {
    const storedValue = localStorage.getItem('admState');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      setIsAdmin(parsedValue);
    }
  }, []);

  return (
    <Fragment>
        <Navbar/>
      <div className="overflow-x-auto mt-2">
        <table className="table table-sm table-zebra ">
          <thead className='px-2'>
            <tr className="text-lg border-t border-black pb-2">
              <td className='text-center text-white'>Name</td>
              <td className='text-center text-white'>Description</td>
              <td className='text-center text-white'>Found At</td>
              <td className='text-center text-white'>Found Date</td>
              <td className='text-center text-white'>Type</td>
              {
                isAdmin ? (
                  <>
                    <td className='text-center text-white'>Update</td>
                    <td className='text-center text-white'>Delete</td>
                  </>
                ) : null
              }
              <td className='text-center text-white'>Detail</td>
            </tr>
          </thead>
          <tbody className="text-lg text-zinc-50 font-medium">
            {d.map((datas: any, index: number) => (
      
              <tr key={datas.id} id='row'
                className={`${index % 2 === 0 ? 'odd:bg-whi odd:text-white' : 'even:bg-white even:text-s-blue'} `}
              >
                <td className='text-center'>{datas.name}</td>
                <td className='text-center'>{datas.description}</td>
                <td className="text-center">{datas.foundAt}</td>
                <td className='text-center'>{formatDate(datas.foundDate)}</td>
                <td className='text-center'>{datas.type}</td>
                {
                  isAdmin ? (
                    <>
                      <td className='text-center'>
                        <Link href={"/update"}>
                          <button onClick={()=>handleUpdate(datas)} className="btn btn-sm btn-outline btn-info"><FaPencilAlt/></button>
                        </Link>
                      </td>
                      <td className='text-center'>
                        <button onClick={()=>handleOpen(datas.id)} className="btn btn-sm btn-outline btn-error"><AiFillDelete/></button>
                      </td>
                    </>
                  ) : null
                }
                <td className='text-center'>
                  <Link href={"/detail"}>
                    <button onClick={()=>handleDetail(datas)} className="btn btn-sm btn-outline btn-info"><AiOutlineInfoCircle/></button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          isAdmin ? (
            <>
              <div className='flex flex-row justify-end fixed bottom-0 right-0 mr-2'>
                <Link  href="/insert">
                  <button className='bg-main-blue my-6 mx-2 px-5 py-2 bg-blue-500 text-white text-sm font-bold tracking-wide rounded focus:outline-none'>Insert</button>
                </Link>
                <button onClick={logOut} className='my-6 mx-2 bg-m-red px-5 py-2 bg-red-500 text-white text-sm font-bold tracking-wide rounded focus:outline-none'>log out</button>
              </div>
            </>
          ) : null
        }
      </div>
      <Modal isOpen={open} onClose={()=>{setopen(false)}}>
        <div className='pt-8 pb-8'>
          <h3 className='text-2xl font-semibold text-white mb-4 text-center'>Are you sure, you want to delete this item?</h3>
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

export async function getServerSideProps(context) {
  try {
    const { name, type, room } = context.query;
    const d = await handler(name, type, room)
    return {
      props: {d}
    }
  } catch (error) {
    return {
      props: {error: 'Failed to fetch data'}
    }
  }
}