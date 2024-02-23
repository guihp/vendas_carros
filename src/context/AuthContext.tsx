import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useState, useEffect } from 'react'
import { auth } from '../services/firebase';

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({ name, email, uid }: UserProps) => void;
    user: UserProps | null;
}

interface AuthProviderProps {
    children: ReactNode
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData)


const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true)


    useEffect(() => {
        
        const olheiro = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })

                setLoadingAuth(false)

            }else{
                setUser(null);
                setLoadingAuth(false)
            }
        })

        return () => {
            olheiro();
        }

    }, [])


        const handleInfoUser = ({ name, email, uid }: UserProps) => {
            setUser({
                uid,
                name,
                email
            })
        }


    
    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth, handleInfoUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;
