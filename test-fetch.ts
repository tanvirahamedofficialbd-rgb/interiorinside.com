import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  console.log("Fetching messages...");
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    console.log("Messages count:", snap.size);
    snap.forEach(doc => console.log(doc.id, doc.data()));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
test().catch(console.error);
