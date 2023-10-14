const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handlerType(){
  try {
    const resp = await fetch(`${url}/getType`, {
      method: "GET",
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