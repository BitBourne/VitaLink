import JWT from 'jsonwebtoken'; 

const generateJWT = (id, roleNames) => {
    // El payload ahora contiene ambos datos
    const payload = { 
        id: id,
        role: roleNames // <-- La adición clave
    };

    return JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export default generateJWT;