const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default async function handler(File:File): Promise<{ status: string; link: string }> {
  try {
    const formData = new FormData();
    formData.append('image', File);
    const resp = await fetch(`${url}/upload`, {
      method: "POST",
      body: formData,
    })
    if(resp.ok){
      return await resp.json()
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    throw error
  }
}