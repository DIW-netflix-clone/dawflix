import { useAuth } from "@/contexts/authContext";
import { signIn } from "@/firebase/auth";

import { useState } from "react"

export const login = () => {
    const { userLoggedIn } = useAuth();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isSignIn,setIsSignIn] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);

    const onSubmit = async(e:Event) =>{
        e.preventDefault();
        if(!isSignIn) {
            setIsSignIn(true);
            await signIn(email,password);
        }
    }

    
}