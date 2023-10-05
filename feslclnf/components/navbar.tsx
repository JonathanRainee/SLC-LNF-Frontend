import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Navbar(){

  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchName, setsearchName] = useState("")
  const [searchType, setsearchType] = useState("")
  const [searchRoom, setsearchRoom] = useState("")
  const [queryName] = useDebounce(searchName, 500)

  useEffect(()=>{
    console.log(queryName, searchRoom, searchType);
    
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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="p-4 normal-case text-xl" href="/">
          SLC L&F
        </Link>
      </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <div className="relative hover:bg-transparent">
            <input onChange={(e)=>setsearchName(e.target.value)} type="text" placeholder="Search" className="input input-bordered input-sm w-full max-w-xs"/>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            </span>
          </div>
        </li>
        <li>
          <div className="relative  hover:bg-transparent">
            <select onChange={(e)=>setsearchType(e.target.value)}   className="input input-bordered input-sm w-full max-w-xs">
              <option value="">Type</option>
              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
        <li>
          <div className="relative hover:bg-transparent">
            <select onChange={(e)=>setsearchRoom(e.target.value)} className="input input-bordered input-sm w-full max-w-xs">
              <option value="">Room</option>
              <option value="123">123</option>
              <option value="623">623</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
}