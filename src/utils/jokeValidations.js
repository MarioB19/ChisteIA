import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { auth } from '@/config/firebase-config';
import sendEmail from './sendEmail';


const db = getFirestore();


export async function canCreateJoke(userID) {
    const today = new Date().toISOString().slice(0, 10); 
    const jokesRef = doc(db, "users", userID, "jokes", today);
  
    const docSnap = await getDoc(jokesRef);
  
    if (!docSnap.exists()) {
  
      return true;
    } else {
      // Verificar el contador de chistes
      const jokesCount = docSnap.data().count || 0;
      return jokesCount < 20; //Maximo de chistes
    }
  }
  
  export async function uploadJoke(userID, newJoke) {
    const today = new Date().toISOString().slice(0, 10); 
    const jokesRef = doc(db, "users", userID, "jokes", today);
  
    const docSnap = await getDoc(jokesRef);
  
    if (!docSnap.exists()) {

      await setDoc(jokesRef, {
        jokesMap: [newJoke],
        count: 1,  
        timestamp: new Date()
      });
      console.log("Primer chiste del día creado.");
    } else {
      // Agregar el nuevo chiste
      const jokesMap = docSnap.data().jokesMap || [];
      const currentCount = docSnap.data().count || 0; 

      if (currentCount === 19) {

        const asunto = `Has alcanzado el límite de chistes del día - ${today}`;
        const mensaje = `
          <h1>¡Wow, qué creatividad!</h1>
          <p>Hola, has llegado al límite de 20 chistes permitidos para el día de hoy (${today}).</p>
          <p>Parece que las ideas no paran de fluir, pero tendrás que esperar hasta mañana para agregar más chistes.</p>
          <p>¡Gracias por usar <strong>ChisteIA</strong>! Nos encanta que estés aprovechando nuestra plataforma al máximo.</p>
          <p>¡Sigue con esa creatividad!</p>
          <p>Saludos,<br>El equipo de ChisteIA</p>
        `;
        
        sendEmail(auth.currentUser.email,asunto,mensaje)
        
      } 

      jokesMap.push(newJoke);
  
  
      await updateDoc(jokesRef, {
        jokesMap: jokesMap,
        count: increment(1) 
      });
      console.log("Chiste agregado.");
    }
  }