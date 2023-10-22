import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {

  const handleClose = (e) => {
    if(e.target.id === "wrapper") onClose()
  }

  if(!isOpen) return null
  return (
    <div className='fixed inset-0 bg-blck bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
      <div className='w-[600px] flex flex-col'>
        <div className='bg-white p-2 rounded-md'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal