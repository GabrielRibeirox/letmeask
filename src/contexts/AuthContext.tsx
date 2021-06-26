import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);            // ----> contexto criado para persistir informações em outras paginas as AuthContextType adiciona a tipagem do typescript



export function AuthContextProvider(props:AuthContextProviderProps){ 
  const [user, setUser] = useState<User>();                                 // ----> fará com que o valor do contexto possa ser modificado
  
  useEffect(() => {                                                        // -----> fará com que os dados permaneçam mesmo se ocorrer um reload da página
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {                                   // ----> se nao encontrar o nome ou foto aponta erro
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {                                     // ---->   Fazendo login com o Google
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
      
      if (result.user) {                                                    
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {                                   // ----> se nao encontrar o nome ou foto aponta erro
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }



  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
    {props.children}
    </AuthContext.Provider>

  );
}