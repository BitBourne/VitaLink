import changePassStep1Service from "../../../Negocio/authServices/changePassStep1Service.js";

const changePassStep1 = async (req, res, next) => {
    try {
        const { email } = req.body;
        const changePassODT = { email };
        
        const result = await changePassStep1Service(changePassODT);
        res.json(result);
    } catch (error) {
        next (error);
    }
}

export default changePassStep1;