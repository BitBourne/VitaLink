import JWT from 'jsonwebtoken'; 

const generateJWT = (id) => {
    return JWT.sign({ id : id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export default generateJWT;