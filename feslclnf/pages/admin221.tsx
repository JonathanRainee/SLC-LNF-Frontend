import React from 'react'
import { useState } from 'react'
import Modal from '../components/modal'
import { useRouter } from 'next/router'

const Admin221 = () => {

  const [open, setopen] = useState(true)
  const router = useRouter()

  function back(){
    router.replace('/')
  }

  return (
    <Modal isOpen={open} onClose={()=>{setopen(false)}}>
      <form action="">
        <div className='pt-4  pb-4 flex justify-center flex-col items-center'>
          {/* <h3 className='text-xl font-semibold text-black mb-4 text-center'>Input admin credential</h3> */}
          <div className='flex justify-center flex-col'>
            <input type="text" id="name" name="name" placeholder="Username" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            <input type="text" id="name" name="name" placeholder="Password" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </form>
          <div className='flex justify-center flex-row items-center'>
              <button className='btn btn-info mr-4 text-white'>Log</button>
              <button className='btn btn-error  ml-4 text-white' onClick={back}>CANCEL</button>
            </div>
      </Modal>
  )
}

export default Admin221