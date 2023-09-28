import React, { createContext, useContext, useState } from "react";


type Data = {
  data:any;
  setData: React.Dispatch<React.SetStateAction<any>>
}
const DataContext = createContext<Data | null>(null)

export function DataProvider({ children }) {
  const [data, setData] = useState<Data | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}