import Link from "next/link";

export default function Navbar(){
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
            <input type="text" placeholder="Search" className="input input-bordered input-sm w-full max-w-xs"/>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            </span>
          </div>
        </li>
        <li>
          <div className="relative  hover:bg-transparent">
            <select className="input input-bordered input-sm w-full max-w-xs">
              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
        <li>
          <div className="relative hover:bg-transparent">
            <select className="input input-bordered input-sm w-full max-w-xs">
              <option value="filter3">Filter 3</option>
              <option value="filter4">Filter 4</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
}