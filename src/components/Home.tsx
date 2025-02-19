import { isSignIn } from "@/firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Principal: React.FC = () =>{
    const navigate = useNavigate();
    const checkUser = async () => {
        const userId = await isSignIn()
        userId ? navigate("/profiles") : navigate("/sign-in")
    }

    useEffect(()=>{
        checkUser()
    },[navigate])

    return(<></>);
}

export default Principal;