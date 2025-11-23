import changepassStep3Service from "../../../Negocio/authServices/changePassStep3Service.js";

const changePassStep3 = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const DTO = { token, password };

        const result = await changepassStep3Service(DTO);

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default changePassStep3;