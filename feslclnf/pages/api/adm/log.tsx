const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(req, res){
  try {
    console.log("hehe");
    
    const resp = await fetch(`${url}/login`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: req.body.username,
        password: req.body.password,
      })
    })
    const data = await resp.json()
    return data
  } catch (error) {
    throw error
  }
  
}