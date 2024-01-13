import Firebase from 'firebase'
import FirebaseTokenGenerator from 'firebase-token-generator'

const firebaseConfig = {
  apiKey: "AIzaSyCnrgwVKqZqKHwOHD9CIfAVvFyjoiSJz7A",
  authDomain: "hungsama-service.firebaseapp.com",
  databaseURL: "https://hungsama-service.firebaseio.com",
  projectId: "hungsama-service",
  storageBucket: "hungsama-service.appspot.com",
  messagingSenderId: "465876338708",
  appId: "1:465876338708:web:bd7cbfdc543de45cf97f01",
  measurementId: "G-CV5KSC92R7"
}

export const firebaseSms = () => {
  const firebase = new Firebase()
}

export const tokenFirebaseGenerate = () => {
  const tokenGenerator = new FirebaseTokenGenerator(firebaseConfig.apiKey);
  const token = tokenGenerator.createToken(
    {uid: "1", some: "arbitrary", data: "here"},
    {admin: true}
  )
  console.log('tokenFirebase', token)
}