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
        <div className='pt-4  pb-4 flex justify-center flex-col items-center'>
          {/* <h3 className='text-xl font-semibold text-black mb-4 text-center'>Input admin credential</h3> */}
          <div className='flex justify-center flex-col'>
            <input onChange={(e)=>setusername(e.target.value)} type="text" id="name" name="name" placeholder="Username" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            <input onChange={(e)=>setpassword(e.target.value)} type="text" id="name" name="name" placeholder="Password" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </form>
          <div className='flex justify-center flex-row items-center'>
              <button className='btn btn-info mr-4 text-white' onClick={login}>Log</button>
              <button className='btn btn-error  ml-4 text-white' onClick={back}>CANCEL</button>
            </div>
      </Modal>
  )
}

export default Admin221