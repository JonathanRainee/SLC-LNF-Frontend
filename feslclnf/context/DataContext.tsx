import React, { createContext, useContext, useState } from "react";

type Data = {
  data:any;
  setData: React.Dispatch<React.SetStateAction<any>>
}

type IsAdmin = {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<Data | null>(null)
const IsAdminContext = createContext<IsAdmin | null>(null)

export function DataProvider({ children }) {
  const [data, setData] = useState<Data | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <IsAdminContext.Provider value={{isAdmin, setIsAdmin}}>
      <DataContext.Provider value={{ data, setData }}>
        {children}
      </DataContext.Provider>
    </IsAdminContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext)
}

export function useIsAdmin(){
  return useContext(IsAdminContext)
}