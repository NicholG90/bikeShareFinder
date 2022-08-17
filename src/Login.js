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
        <div className="mainContent">
            <div className='loginButtons'>
                <button className="googleButton" onClick={signInWithGoogle}>Sign in with Google</button>
                <button className="anonButton" onClick={signInAnon}>Sign in Anonymously</button>
            </div>
        </div>
    )
}

export default Login