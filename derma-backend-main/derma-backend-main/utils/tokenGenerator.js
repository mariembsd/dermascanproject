import jwt from 'jsonwebtoken';

const generateToken = (userId, role = 'user') => {
 return jwt.sign(
  { id: userId, role }, 
  process.env.JWT_SECRET || 'your_secret_key', 
  { expiresIn: '7d' } // Options
 );
};

export default generateToken;
