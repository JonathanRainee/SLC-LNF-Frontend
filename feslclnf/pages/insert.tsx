import React, { Fragment, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
import Modal from '../components/modal';
import handler from './api/items/upload'


export default function Insert(){

  const [name, setname] = useState("")
  const [type, settype] = useState("")
  const [foundAt, setfoundAt] = useState("")
  const [foundDate, setfoundDate] = useState("")
  const [desc, setdesc] = useState("")
  const [ imgLink, setImgLink] = useState("-")
  const [img, setImg] = useState<File|null>(null)
  const router = useRouter()

  const onChangePic = e => {
    setImg(e.target.files[0])
  }

  const uploadImg = async (e) => {
    e.preventDefault();
    if(!img) return
    try {
      const resp = await handler(img)
      setImgLink(resp.link)
    } catch (error) {
    }
  }

  const insertItem = async () => {
    const resp = await fetch('/api/items/insert', {
      method: "POST",
      body: JSON.stringify({
        name: name,
        type: type,
        foundAt: foundAt,
        foundDate: foundDate,
        description: desc,
        imageLink: imgLink
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((e)=>{
      router.back()
    })
  }

  return(
    <div>
      <div className="max-w-lg mx-auto mt-2 p-6 rounded-lg shadow-lg">
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold">Name</label>
              <input onChange={(e)=>setname(e.target.value)} type="text" id="name" name="name" placeholder="Enter item name" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="type" className="block font-semibold">Type</label>
              <input onChange={(e)=>settype(e.target.value)} type="text" id="type" name="type" placeholder="Enter item type" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundAt" className="block font-semibold">Found At</label>
              <input onChange={(e)=>setfoundAt(e.target.value)} type="text" id="foundAt" name="foundAt" placeholder="Enter found room" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundDate" className="block font-semibold">Found Date</label>
              <input onChange={(e)=>setfoundDate(e.target.value)} type="date" id="foundDate" name="foundDate" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="description" className="block font-semibold">Description</label>
              <textarea onChange={(e)=>setdesc(e.target.value)} id="description" name="description" placeholder="Enter item description" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block font-semibold">Image</label>
              <div className='flex justify-between'>
                <input onChange={onChangePic} type="file" className="file-input file-input-bordered file-input-sm w-full max-w mr-4" />
                <button onClick={uploadImg} className="btn btn-outline btn-info btn-sm">Upload</button>
              </div>
            </div>
          </div>
          <button onClick={insertItem} type="submit" className="w-full bg-blue-500 text-white py-2 my-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none">
            Insert Item
          </button>
        </form>
      </div>
    </div>
  )
}

