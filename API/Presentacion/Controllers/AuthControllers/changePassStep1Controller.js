import changePassStep1Service from "../../../Negocio/authServices/changePassStep1Service.js";

const changePassStep1 = async (req, res, next) => {
    try {
        const { email, medical_license } = req.body;
        const changePassODT = { email, medical_license };

        const result = await changePassStep1Service(changePassODT);
        res.json({
            success: true,
            message: result.msg
        });
    } catch (error) {
        next(error);
    }
}

export default changePassStep1;