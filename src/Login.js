import { useContext } from "react";
import { signInWithGoogle, signInAnon } from "./firebase";
import { AuthContext } from "./Auth.js";
import { Navigate } from 'react-router-dom';


function Login() {

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/saved" replace />;
    }

    return (
        <>
            <button className="mainContent" onClick={signInWithGoogle}>Sign In</button>
            <button className="mainContent" onClick={signInAnon}>Sign In Anon</button>
        </>
    )
}

export default Login