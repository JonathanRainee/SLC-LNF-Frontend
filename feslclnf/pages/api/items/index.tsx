const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(name: string, type: string, room: string) {
  try {
    const queryParams = new URLSearchParams()
    if(name !== undefined){
      queryParams.append('name', name)
    }
    if(type !== undefined){
      queryParams.append('type', type)
    }
    if(room !== undefined){
      queryParams.append('foundAt', room)
    }
    const queryString = queryParams.toString()
    
    const urlWithQuery = queryString ? `${url}/itemSearch?${queryString}` : `${url}/items`;
    
    const resp = await fetch(urlWithQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json()
    return data
  } catch (error) {
    throw error
  }
}

