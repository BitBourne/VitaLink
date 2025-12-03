import crypto from 'crypto';

const generateToken = () => {
    // Genera un número aleatorio entre 100000 (incluido) y 1000000 (excluido)
    const token = crypto.randomInt(100000, 1000000);
    return token.toString();
};

export default generateToken;