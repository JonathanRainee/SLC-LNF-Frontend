import React, { Fragment, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
import Modal from '../components/modal';
import handler from './api/items/upload'
import { TailSpin } from 'react-loader-spinner';
import {MdOutlineDoneOutline} from 'react-icons/md'
import { AiOutlineUpload } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { table } from 'console';

export default function Insert(){

  const [name, setname] = useState("")
  const [type, settype] = useState("")
  const [foundAt, setfoundAt] = useState("")
  const [foundDate, setfoundDate] = useState("")
  const [desc, setdesc] = useState("")
  const [ imgLink, setImgLink] = useState("")
  const [ uploading, setuploading ] = useState(false) 
  const [ uploadingFile, setuploadingFile ] = useState(false) 
  const [img, setImg] = useState<File|null>(null)
  const [data, setdata] = useState([])
  const [ doneUploading, setDoneUploading ] = useState(false)
  const router = useRouter()

  const [columnToExtract, setColumnToExtract] = useState('');
  const [extractedData, setExtractedData] = useState([]);

  const onChangePic = e => {
    setImg(e.target.files[0])
  }

  const uploadImg = async (e) => {
    e.preventDefault();
    if(!img) return
    setuploading(true)
    try {
      const resp = await handler(img)
      setImgLink(resp.link)
      setuploading(false)
    } catch (error) {
      setuploading(false)
    }
  }

  const uploadWFile =async (e) => {
    e.preventDefault();
    setuploadingFile(true)
    data.forEach(async e => {
      console.log(e.name, e.type, e.foundAt, e,foundDate, e.desc);
      const resp = await fetch('/api/items/insert', {
        method: "POST",
        body: JSON.stringify({
          name: e.name,
          type: e.type,
          foundAt: e.foundAt.toString(),
          foundDate: e.foundDate,
          description: e.desc,
          imageLink: "-"
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
    setuploadingFile(false)
    setDoneUploading(true)
    router.replace('/')
  }

  const handleFileUpload =  (e) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, {type: "binary"})
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      console.log(parsedData[0]);
      setdata(parsedData)
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
    <div className='justify-center items-center h-screen'>
      <div className="max-w-lg mx-auto pt-8 rounded-lg">
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold text-blck">Name</label>
              <input onChange={(e)=>setname(e.target.value)} type="text" id="name" name="name" placeholder="Enter item name" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="type" className="block font-semibold text-blck">Type</label>
              <input onChange={(e)=>settype(e.target.value)} type="text" id="type" name="type" placeholder="Enter item type" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundAt" className="block font-semibold text-blck">Found At</label>
              <input onChange={(e)=>setfoundAt(e.target.value)} type="text" id="foundAt" name="foundAt" placeholder="Enter found room" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="foundDate" className="block font-semibold text-blck">Found Date</label>
              <input onChange={(e)=>setfoundDate(e.target.value)} type="date" id="foundDate" name="foundDate" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500" required/>
            </div>
            <div>
              <label htmlFor="description" className="block font-semibold text-blck">Description</label>
              <textarea onChange={(e)=>setdesc(e.target.value)} id="description" name="description" placeholder="Enter item description" className="bg-white my-1 w-full px-3 py-1 border rounded-md focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block font-semibold text-blck mb-2">Image</label>
              <div className='flex justify-between'>
                <input onChange={onChangePic} type="file" className="file-input file-input-bordered file-input-sm w-full mr-4 bg-white" />
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
            <div>
              <label htmlFor="image" className="block font-semibold text-blck mb-2">File</label>
              <div className='flex justify-between'>
                <input accept=".xlsx, .xls" type="file" className="file-input file-input-bordered file-input-sm w-full mr-4 bg-white" onChange={handleFileUpload}/>
                <button onClick={uploadWFile}  className="btn btn-outline btn-info btn-sm ">
                
                  <AiOutlineUpload/>
                  {uploadingFile ? (
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
                    doneUploading && <MdOutlineDoneOutline/>
                  )}
                </button>
              </div>
            </div>
          </div>
          <button onClick={insertItem} type="submit" className="w-full bg-blue-500 text-blck py-1 my-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none bg-s-blue">
            Insert Item
          </button>
        </form>
      </div>
    </div>
  )
}

