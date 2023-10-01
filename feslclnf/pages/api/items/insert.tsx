const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${url}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: req.body.name,
        type: req.body.type,
        foundAt: req.body.foundAt,
        foundDate: req.body.foundDate,
        description: req.body.description,
        imageLink: req.body.imageLink
      })
    })
    res.status(201).json({name:"ok"})
  } catch (error) {
    throw error;
  }
}