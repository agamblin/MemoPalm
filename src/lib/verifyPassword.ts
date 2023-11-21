import bcrypt from 'bcryptjs';

async function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}

export default verifyPassword;
