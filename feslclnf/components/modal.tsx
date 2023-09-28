import React from 'react'

const Modal = ({ id, isOpen, onClose, children }) => {

  const handleClose = (e) => {
    if(e.target.id === "wrapper") onClose()
  }

  if(!isOpen) return null
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id="wrapper" onClick={handleClose}>
      <div className='w-[600px] flex flex-col'>
        <div className='bg-blue-200 p-2 rounded'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal