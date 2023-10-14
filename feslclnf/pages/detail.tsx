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
  const [ imgLink, setImgLink] = useState("")

}