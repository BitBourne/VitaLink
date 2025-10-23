import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  // El segundo argumento son los "salt rounds" o el "cost factor".
  // 10 es un buen valor por defecto, representa el coste computacional.
  // Un valor más alto es más seguro pero más lento.
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
    throw new Error('No se pudo hashear la contraseña.');
  }
};

export default hashPassword