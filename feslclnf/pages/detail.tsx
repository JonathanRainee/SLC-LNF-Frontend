import React from 'react'
import { useData } from '../context/DataContext'
import { useState } from 'react'

export default function Detail(){

  const { data, setData } = useData()
  const [name, setname] = useState(data.name)
  const [type, settype] = useState(data.type)
  const [foundAt, setfoundAt] = useState(data.foundAt)
  const [foundDate, setfoundDate] = useState(data.foundDate)
  const [desc, setdesc] = useState(data.description)

  function getDayName(date: Date): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  const date = new Date(foundDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const dayName = getDayName(date);


  const imgLink = data.imageLink == "-" ? "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : data.imageLink

  return(
    <section className="text-gray-700 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200" src={imgLink}>
        </img>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <div className='border-b-2'>
          <h1 className="text-white text-3xl title-font font-medium mb-1">{name}</h1>
        </div>
        <div className="flex mb-4 flex-col mt-2">
          <span className="flex items-center">
            <span className="text-white">Found at: {foundAt}</span>
          </span>
          <span className="flex items-center">
            <span className="text-white">Found date: {dayName}, {formattedDate}</span>
          </span>
        </div>
        <p className="leading-relaxed text-white">{desc}</p>
        <div className="flex mt-6 items-center pb-5  border-gray-200 mb-5">
        </div>
      </div>
    </div>
  </div>
</section>
  )
}