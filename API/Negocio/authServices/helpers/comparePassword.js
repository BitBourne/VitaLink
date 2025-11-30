import bcrypt from 'bcrypt';

const comparePassword = async (plainPassword, hashedPasswordFromDB) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
    return isMatch;
  } catch (error) {
    console.error('Error al comparar las contraseñas:', error);
    return false;
  }
};

export default comparePassword


