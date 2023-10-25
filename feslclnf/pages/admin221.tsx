import React from 'react'
import { useState } from 'react'
import Modal from '../components/modal'
import { useRouter } from 'next/router'
import { useIsAdmin } from '../context/DataContext'

const Admin221 = () => {

  const router = useRouter()
  const [open, setopen] = useState(true)
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const { isAdmin, setIsAdmin } = useIsAdmin()
  
  function back(){
    router.replace('/')
  } 

  const login = async () => {
    try {
      const response = await fetch('/api/adm/log', {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
  
      if (response.status === 200) {
        setIsAdmin(true)
        localStorage.setItem('admState', JSON.stringify(true));
        const data = await response.json();
        router.replace('/')
      } else if (response.status === 401) {
        const data = await response.json();

      } else {
      
      }
    } catch (error) {
      console.log(error);
      
      console.error('An error occurred:', error);
    }
    
  }


  return (
    <Modal isOpen={open} onClose={()=>{setopen(false)}}>
      <form action="">
        <div className='pt-12 pb-6 flex justify-center flex-col items-center'>
          {/* <h3 className='text-xl font-semibold text-black mb-4 text-center'>Input admin credential</h3> */}
          <div className='flex justify-center flex-col'>
            <input onChange={(e)=>setusername(e.target.value)} type="text" id="name" name="name" placeholder="Username" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none border-s-blue focus:border-col- focus:border-main-blue text-blck" />
            <input onChange={(e)=>setpassword(e.target.value)} type="password" id="name" name="name" placeholder="Password" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none border-s-blue focus:border-col- focus:border-main-blue text-blck" />
          </div>
        </div>
      </form>
      <div className='flex justify-center flex-row items-center pb-4'>
        <button className='btn btn-info mr-4 text-white bg-t-blue' onClick={login}>Log</button>
        <button className='btn btn-error ml-4 text-white bg-s-red' onClick={back}>CANCEL</button>
      </div>
      </Modal>
  )
}

export default Admin221