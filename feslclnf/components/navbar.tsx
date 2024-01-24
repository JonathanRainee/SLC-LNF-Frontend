import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import handlerRoom from "../pages/api/items/room";
import handlerType from "../pages/api/items/type";
import { v4 as uuidv4 } from 'uuid';
import React from "react"

export default function Navbar(){

  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchName, setsearchName] = useState("")
  const [searchType, setsearchType] = useState("")
  const [searchRoom, setsearchRoom] = useState("")
  const [queryName] = useDebounce(searchName, 500)
  const [ rooms, setRooms ] = useState([])
  const [ types, setTypes ] = useState([])

  useEffect(()=>{
    const roomData = async () => {
      try {
        const data = await handlerRoom()
        setRooms(data)
      } catch (error) {
        console.log(error)
      }
    }
    roomData()
  }, [])
  
  useEffect(()=>{
    const typeData = async () => {
      try {
        const data = await handlerType()
        setTypes(data)
      } catch (error) {
        console.log(error)
      }
    }
    typeData()
  }, [])

  useEffect(()=>{
    if(!queryName && !searchRoom && !searchType){
      router.push("/")
    }else{
      router.push(
        `?name=${queryName}&type=${searchType}&room=${searchRoom}`,
        {
          scroll:false
        }
      )
    }
  }, [queryName, searchType, searchRoom, router])

  return(
    <div className="navbar bg-main-blue">
      <div className="flex-1">
        <Link className="p-2 normal-case text-xl text-white" href="/">
          SLC L&F
        </Link>
      </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <div className="relative hover:bg-transparent">
            <input onChange={(e) => setsearchName(e.target.value)} type="text" placeholder="Search"
              className="bg-white input input-bordered input-sm w-full text-blck placeholder-blck border-midnight"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3"></span>
          </div>
        </li>
        <li>
          <div className="relative  hover:bg-transparent">
            <select onChange={(e)=>setsearchType(e.target.value)}   className="bg-white input input-bordered input-sm w-full max-w-xs text-blck border-midnight">
              <option value="">{searchType === "" ? "Type" : searchType}</option>
              {
                types.map((e)=>{
                  var id = uuidv4()
                  return(
                    <React.Fragment key={id}>
                      <option value={e.type}>{e.type}</option>
                    </React.Fragment>
                  )
                })
              }
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
        <li>
          <div className="relative hover:bg-transparent">
            <select onChange={(e)=>setsearchRoom(e.target.value)} className="bg-white input input-bordered input-sm w-full max-w-xs text-blck border-midnight">
              <option value="">{searchRoom === "" ? "Room" : searchRoom}</option>
              {
                rooms.map((e)=>{
                  var id = uuidv4()
                  return(
                    <React.Fragment key={id}>
                      <option value={e.foundAt}>{e.foundAt}</option>
                    </React.Fragment>
                  )
                })
              }
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
}