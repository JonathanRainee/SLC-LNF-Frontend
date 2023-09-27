'use client'

import * as React from "react";
  import dynamic from "next/dynamic";
  const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

function formatDate(dateString: string) {
  if (!dateString) {
    return ''; // Handle empty dates gracefully if needed
  }

  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function ClientSideHomeComponent() {
  const [data, setData] = React.useState([]);

  React.useEffect (() => {
    const fetchData = async () => {
      
      const response = await fetch(`${url}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (e) => {
        setData(await e.json())
      })
    
      return response
    };
    fetchData()
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm table-zebra ">
        <thead>
          <tr className="text-lg border-t border-black">
            <td>Name</td>
            <td>Description</td>
            <td>Found At</td>
            <td>Found Date</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody className="text-lg text-neutral-50 font-medium">
          {data.map((d: any, index: number) => (
            <tr
              key={d.id}
              className={`text-sm ${
                index % 2 === 0
                  ? 'odd:bg-blue-400 odd:text-white'
                  : 'even:bg-white even:text-blue-500'
              } hover:bg-blue-200 border-t border-black`}
            >
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td className="">{d.foundAt}</td>
              <td>{formatDate(d.foundDate)}</td>
              <td>{d.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Home = dynamic(() => Promise.resolve(ClientSideHomeComponent), {
  ssr: false,
});

export default Home;