import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  const snap = await getDoc(doc(db, 'site_settings', 'main'));
  if (snap.exists()) {
    console.log(JSON.stringify(snap.data().videos, null, 2));
  } else {
    console.log("No data");
  }
}
test().catch(console.error);
