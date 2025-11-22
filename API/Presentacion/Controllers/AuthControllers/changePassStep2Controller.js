import changePassStep2Service from "../../../Negocio/authServices/changePassStep2Service.js";

const changePassStp2 = async (req,res,next) => {
    try {
        // take the token from the URL
        const { token } = req.params;
        const changePassODT = { token };
        
        const result = await changePassStep2Service(changePassODT);
        
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default changePassStp2;