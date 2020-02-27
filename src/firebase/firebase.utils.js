import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAlcG5Q-fqCHqg9voYpl0AoDaMCyPdSVu4",
    authDomain: "e-shop-13a29.firebaseapp.com",
    databaseURL: "https://e-shop-13a29.firebaseio.com",
    projectId: "e-shop-13a29",
    storageBucket: "e-shop-13a29.appspot.com",
    messagingSenderId: "387717768809",
    appId: "1:387717768809:web:caa10000d90011617c64f8",
    measurementId: "G-NRJN75X7L4"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData 
           }) 
        } catch(err) {
            console.log('error creating new user', err.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ promt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase