import { useContext } from 'react'; 

import AuthContext from "../auth/context/authProvider";
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;