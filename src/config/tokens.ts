import jwt, { JwtPayload } from "jsonwebtoken";
import globalConstants from "../conts/globalContants";

interface UserPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}
//genero el token
const generateToken = (payload: UserPayload, expiresIn: string = "2d") => {
  const token = jwt.sign({ user: payload }, globalConstants.SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

//el metodo verify comprueba que el token no haya sido modificado
const validateToken = (token: string): { user: UserPayload } => {
  return jwt.verify(token, globalConstants.SECRET) as { user: UserPayload };
};

export { generateToken, validateToken };
