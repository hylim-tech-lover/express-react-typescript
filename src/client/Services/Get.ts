export default async function Get(url: string): Promise<any> {
  try {
    const response: Response = await fetch(url);
    return response.json();
  } catch (e: any) {
    throw new Error(e);
  }
}
