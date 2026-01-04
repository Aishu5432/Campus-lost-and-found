// test-auth.mjs (use .mjs extension)
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCP-mtdRyXPWDAbIareWFMiVg9UJlEMfJI",
  authDomain: "campus-lost-found-a21b8.firebaseapp.com",
  projectId: "campus-lost-found-a21b8",
  storageBucket: "campus-lost-found-a21b8.firebasestorage.app",
  messagingSenderId: "427890974642",
  appId: "1:427890974642:web:03c0f735ec1e7cef19ceab",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testFirebase() {
  const testEmail = `test${Date.now()}@test.com`;
  const testPassword = 'Test@123456';
  
  console.log('Testing Firebase Authentication...');
  console.log('Test Email:', testEmail);
  
  try {
    console.log('\n1. Creating test user...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('✅ SUCCESS: User created!');
    console.log('User ID:', userCredential.user.uid);
    console.log('User Email:', userCredential.user.email);
    
    console.log('\n2. Deleting test user...');
    await userCredential.user.delete();
    console.log('✅ Test user deleted.');
    
    console.log('\n🎉 Firebase Authentication is WORKING!');
    console.log('\nNext steps:');
    console.log('1. Go to http://localhost:3001/register');
    console.log('2. Register with a real email');
    console.log('3. Then login with the same credentials');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.code);
    console.error('Message:', error.message);
    
    if (error.code === 'auth/operation-not-allowed') {
      console.log('\n🔥 SOLUTION:');
      console.log('1. Go to: https://console.firebase.google.com/');
      console.log('2. Select your project: "Campus Lost-Found"');
      console.log('3. Click "Authentication" in left sidebar');
      console.log('4. Click "Sign-in method" tab');
      console.log('5. Enable "Email/Password"');
      console.log('6. Click "Save"');
    }
  }
}

testFirebase();