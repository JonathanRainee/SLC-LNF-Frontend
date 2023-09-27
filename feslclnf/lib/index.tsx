const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

// const getItems = async () => {
//   const resp = await fetch(`${url}/items`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   return resp
// }

export default async function getItems() {
  const resp = await fetch(`${url}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return resp
}
