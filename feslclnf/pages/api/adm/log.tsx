const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(req, res){
  try {
    
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
    if (resp.status === 200) {
      const data = await resp.json();
      res.status(200).json(data); 
    } else if (resp.status === 401) {
      const data = await resp.json();
      res.status(401).json(data);
    } else {
      res.status(resp.status).json({ message: 'Unexpected response status' });
    }
    return resp.json()
  } catch (error) {
    throw error
  }
  
}