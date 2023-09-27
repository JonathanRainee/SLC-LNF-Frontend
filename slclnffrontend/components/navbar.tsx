export default function Navbar(){
  return(
    <head>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">SLC L&F</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><a>Light</a></li>
              <li>
                <details>
                  <summary>
                    Menus
                  </summary>
                  <ul className="p-2 bg-base-100">
                    <li><a>Insert</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </head>
  )
}