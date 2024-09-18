import { RequestHandler } from "express";
import * as userService from "../service/user.service";
import { generateToken, validateToken } from "../config/tokens";

export const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await userService.findUser(email);
    if (userEmail) {
      return res.status(400).send("The user already exists!");
    }
    const user = await userService.createUser(name, email, password);
    res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUser(email);
    if (!user) {
      return res.status(400).send("The user is not registered!");
    }
    const isValid = await user.validatePassword(password);
    console.log("valor de isValid", isValid);
    if (!isValid) {
      return res.status(401).send("Password is not correct");
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    console.log("valor de payload", payload);
    const token = generateToken(payload);
    console.log("valor del token", token);
    res.cookie("token", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).send({ token, ...payload });
  } catch (error) {
    const err = error as Error; // Casting explícito a Error
    console.error("Error during login:", err.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const me: RequestHandler = (req, res) => {
  return res.send(req.user);
};

export const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    // Enviar una respuesta para confirmar el éxito del logout
    res.status(200).json({ message: "Logged out successfully" });
    console.log("res", res.clearCookie);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getAllusers: RequestHandler = async (req, res) => {
  try {
    const allUsers = await userService.getUsers();
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const getAuser = await userService.getUser(Number(id));
    if (!getAuser) {
      return res.status(404).send("This user does not exists!");
    }
    return res.status(200).send(getAuser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const userUpdated = await userService.updateUser(Number(id), name, email);
    if (!userUpdated) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(userUpdated);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await userService.deleteUser(Number(id));
    if (!rowsDeleted) {
      return res.status(404).send("The user does not exists!");
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//generamos el link de recuperacion de contraseña y lo envia por email
export const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await userService.forgotPassword(email);
    if (!userEmail) {
      return res.status(401);
    }
    return res.status(200).send(userEmail);
  } catch (error) {
    return res.status(500).send(error);
  }
};

//una vez que el usuario recibe el correo con el link para cambiar la contraseña se procede a validar el token
export const validateTokenRestorePassword: RequestHandler = async (
  req,
  res
) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(401).send("Token missing");
    const { user } = validateToken(token);
    if (!user) return res.status(401).send("Invalid or expired token");
    const getToken = await userService.validateTokenRestorePassword(token);
    if (!getToken) {
      return res.status(401).send("Token not found in the database");
    }
    return res.status(200).send(getToken);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// //En el momento en que el usuario le da el click para confirmar la nueva contraseña y haya pasado las validaciones del front, vuelve a verificar si el token sigue siendo valido o si ha expirado y luego se guarda la nueva contraseña.
export const overWritePassword: RequestHandler = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(401).send("Token missing");

    const { password } = req.body;
    if (!password) return res.status(401).send("password does not exist!");

    //le ponemos un alias a user
    const { user: validateUser } = validateToken(token);
    if (!validateUser) return res.status(401).send("Invalid or expired token");

    const updatedUser = await userService.overWritePassword(token, password);
    if (!updatedUser) {
      return res.status(401).send("Failed to update user");
    }
    return res.status(200).send({
      message: "Password updated successfully!",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error overwriting password", error);
    return res.status(500).send("Internal Server Error");
  }
};
