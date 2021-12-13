import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  doc, getDocs, addDoc, deleteDoc,
  query, where,
  orderBy, serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from 'firebase/auth';


// collection - refference to collection
// doc - refference to document


const firebaseConfig = {
  apiKey: "AIzaSyCBjRWtYvKup5phF1TkVMx1yAzR_1pNmkw",
  authDomain: "test-2897a.firebaseapp.com",
  projectId: "test-2897a",
  storageBucket: "test-2897a.appspot.com",
  messagingSenderId: "230683879605",
  appId: "1:230683879605:web:7cb98a19391bc1d5ab36fc"
};

initializeApp(firebaseConfig);// init firebase
const db = getFirestore();// init services
const auth = getAuth();

const colRef = collection(db, 'books');// collection ref

getDocs(colRef) // all docs in collection
.then(snapshot => {
  // console.log(snapshot.docs)
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id }) // method data - gets data from snapshot object
  })
  console.log(books);
})
.catch(err => console.log(err.message));

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => addBookForm.reset())
});

// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => deleteBookForm.reset())
});

// realtime collection data ==============================================
const unsubscribeCollection = onSnapshot(colRef, (snapshot) => { // returns unsubscribe method
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
});

// get sorted data by query ==============================================
const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('createdAt')); // query goes anywhere instead of snapshot
// orderBy('title', 'desc') - by title and in descending order
// orderBy('title', 'asc')

getDocs(q)
.then(snapshot => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id }) // method data - gets data from snapshot object
  })
  console.log(books);
});


// fetching a single document (& realtime) ==============================================
const docRef = doc(db, 'books', 'YS4IogzoLfgAT2Y1gd1y');

getDoc(docRef)
  .then(doc => {
    console.log(doc.data(), doc.id)
  })

const unsubscribeDocs = onSnapshot(docRef, (doc) => console.log(doc.data(), doc.id));

// updating a document ==============================================
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, { title: 'updated title' })
  .then(() => updateForm.reset());
});


// signing users up ==============================================
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(credentials => {
      console.log('user created:', credentials.user);
      signupForm.reset();
    })
    .catch(err => console.log(err.message));// will error when pass less than 6 characters - dispatch... password is too short
});


// logging in and out ==============================================
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => console.log('user signed out'))
    .catch(err => console.log(err.message));
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(credentials => {
      console.log('user logged in:', credentials.user);
      loginForm.reset();
    })
    .catch(err => console.log(err.message));
});

// subscribing to auth changes - observer ==============================================
const unsubscribeAuth = onAuthStateChanged(auth, (user) => { // returns unsubscribe method
  console.log('user status changed:', user) // here could be script that controlling forms...
})

// unsubscribing from changes (auth & db) ==============================================
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing');
  unsubscribeCollection();
  unsubscribeDocs();
  unsubscribeAuth();
});