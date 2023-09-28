const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${url}/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: req.body.id,
      })
    })
    res.status(201).json({name:"ok"})
  } catch (error) {
    throw error;
  }
}