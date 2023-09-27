const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler() {
  try {
    const resp = await fetch(`${url}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await resp.json()
    return data
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

