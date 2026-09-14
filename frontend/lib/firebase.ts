import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAHhtE985RjzhKLhGd-42HZCzuyplqkiYo',
  authDomain: 'sweetex-ai.firebaseapp.com',
  databaseURL:
    'https://sweetex-ai-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sweetex-ai',
  storageBucket: 'sweetex-ai.firebasestorage.app',
  messagingSenderId: '127322756726',
  appId: '1:127322756726:web:aeb5a1973ea7b2df71b157',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getDatabase(app)
export default app
