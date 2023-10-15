import React, { Fragment, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
import Modal from '../components/modal';
import handler from './api/items/upload'
import { useData } from '../context/DataContext';
import { TailSpin } from 'react-loader-spinner';
import {MdOutlineDoneOutline} from 'react-icons/md'
import { AiOutlineUpload } from "react-icons/ai";
import { describe } from 'node:test';


const Update = () => {
  const { data, setData } = useData()
  const [name, setname] = useState(data.name)
  const [type, settype] = useState(data.type)
  const [foundAt, setfoundAt] = useState(data.foundAt)
  const [foundDate, setfoundDate] = useState(data.foundDate)
  const [desc, setdesc] = useState(data.description)
  const [ imgLink, setImgLink] = useState("")
  const [ uploading, setuploading ] = useState(false) 
  const [img, setImg] = useState<File|null>(null)
  const router = useRouter()
  console.log(foundDate);

  const date = new Date(foundDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  
  const updateItem = async () => {
    const resp = await fetch('/api/items/update', {
      method: "PUT",
      body: JSON.stringify({
        id: data.id,
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

  const onChangePic = e => {
    setImg(e.target.files[0])
  }

  const uploadImg = async (e) => {
    e.preventDefault();
    if(!img) return
    setuploading(true)
    try {
      const resp = await handler(img)
      console.log(resp);
      setImgLink(resp.link)
      setuploading(false)
    } catch (error) {
      setuploading(false)
    }
  }

  return(
    <div>
      <div className="max-w-lg mx-auto mt-2 p-6 rounded-lg shadow-lg">
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold">Name</label>
              <input value={name} onChange={(e)=>setname(e.target.value)} type="text" id="name" name="name" placeholder="Enter item name" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="type" className="block font-semibold">Type</label>
              <input value={type} onChange={(e)=>settype(e.target.value)} type="text" id="type" name="type" placeholder="Enter item type" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundAt" className="block font-semibold">Found At</label>
              <input value={foundAt} onChange={(e)=>setfoundAt(e.target.value)} type="text" id="foundAt" name="foundAt" placeholder="Enter found room" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundDate" className="block font-semibold">Found Date</label>
              <input value={formattedDate} onChange={(e)=>setfoundDate(e.target.value)} type="date" id="foundDate" name="foundDate" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="description" className="block font-semibold">Description</label>
              <textarea value={desc} onChange={(e)=>setdesc(e.target.value)} id="description" name="description" placeholder="Enter item description" className="my-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block font-semibold mb-2">Image</label>
              <div className='flex justify-between'>
                <input onChange={onChangePic} type="file" className="file-input file-input-bordered file-input-sm w-full mr-4" />
                <button onClick={uploadImg} className="btn btn-outline btn-info btn-sm">
                
                  <AiOutlineUpload/>
                  {uploading ? (
                    <TailSpin
                      height="15"
                      width="15"
                      color="##1e71f7"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    imgLink && <MdOutlineDoneOutline/>
                  )}
                </button>
              </div>
            </div>
          </div>
          <button onClick={updateItem} type="submit" className="w-full bg-blue-500 text-white py-2 my-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Update Item
          </button>
        </form>
      </div>
    </div>
  )
}


export default Update
