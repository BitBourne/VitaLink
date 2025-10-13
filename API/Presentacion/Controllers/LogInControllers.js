import { loginService } from "../../Negocio/authServices/logInService.js";



const login = (req, res) => {
    const email = "correo@correo.com";
    const password = true;

    const dto = {email, password}

    const result = loginService(dto);
    


    return res.json({"message": result});
}


export {
    login
};