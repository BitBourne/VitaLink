import changePassStep2Service from "../../../Negocio/authServices/changePassStep2Service.js";

const changePassStp2 = async (req, res, next) => {
    try {
        const { token } = req.params;
        const changePassODT = { token };

        const result = await changePassStep2Service(changePassODT);

        res.json({
            success: true,
            message: result.message || result
        });
    } catch (error) {
        next(error);
    }
}

export default changePassStp2;