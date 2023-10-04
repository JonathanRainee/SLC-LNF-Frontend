const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(name: string, type: string, room: string) {
  try {
    console.log(`${name}||${type}||${room}`);
    
    const queryParams = new URLSearchParams()
    if(name !== undefined){
      console.log(name)
      queryParams.append('name', name)
    }
    if(type !== undefined){
      console.log(type)
      queryParams.append('type', type)
    }
    if(room !== undefined){
      console.log(room)
      queryParams.append('foundAt', room)
    }
    const queryString = queryParams.toString()
    
    console.log(queryString);
    const urlWithQuery = queryString ? `${url}/itemSearch?${queryString}` : `${url}/items`;
    console.log(urlWithQuery);
    
    
    const resp = await fetch(urlWithQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

