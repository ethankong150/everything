import { getDB } from './db'

async function shortenUrl(url: string): Promise<string> {
    const db = await getDB();
  
    const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
    console.log(result);
    const id = result.lastID;
    const short = `http://localhost:3333/s/${id}`;
  
    return short;
  }
  
async function lookupUrl(shortenedId: number) {
    const db = await getDB();
  
    const result = await db.get(
      'SELECT original FROM url WHERE id = (?)',
      shortenedId
    );
    console.log(result);
    return result.original;
}
export {shortenUrl, lookupUrl}; 