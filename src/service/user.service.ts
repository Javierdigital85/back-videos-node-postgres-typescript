import transporter from "../config/mailer";
import { generateToken } from "../config/tokens";
import User from "../models/User";
import globalConstants from "../conts/globalContants";

export const findUser = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email: email } });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  return await User.create({ name, email, password });
};

export const getUsers = async (): Promise<User[]> => {
  return await User.findAll();
};

export const getUser = async (id: number): Promise<User | null> => {
  const userId = await User.findByPk(id);
  if (!userId) {
    return null;
  }
  return userId;
};

export const updateUser = async (
  id: number,
  name: string,
  email: string
): Promise<User | null> => {
  const [rows, user] = await User.update(
    {
      name,
      email,
    },
    { where: { id: id }, returning: true }
  );
  if (rows === 0) {
    return null;
  }
  return user[0];
};

export const deleteUser = async (id: number): Promise<number> => {
  return await User.destroy({ where: { id: id } });
};

export const forgotPassword = async (email: string): Promise<string | null> => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return null;
  }
  const token = generateToken(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    "10m"
  );
  user.token = token; //asignamos el token
  await user.save();
  const restorePasswordURL = `${globalConstants.FRONTEND_URL}/repeat-password/${user.token}`;
  // send mail with defined transport object
  await transporter.sendMail({
    from: `"Forgot password 👻" <${globalConstants.NODEMAILER_EMAIL}>`, // sender address
    to: user.email, // list of receivers
    subject: "Forgot password ✔", // Subject line
    html: `
  <b>Please click on the following link, or paste this into your browser to complete the process</b>
  <a href="${restorePasswordURL}">${restorePasswordURL}</a>
  `,
  });
  return user.email;
};

export const validateTokenRestorePassword = async (
  token: string
): Promise<User | null> => {
  return await User.findOne({ where: { token: token } });
};

export const overWritePassword = async (
  token: string,
  newPassword: string
): Promise<User | null> => {
  const user = await User.findOne({ where: { token: token } });
  if (!user) return null;

  user.token = null;
  if (!user.salt) {
    throw new Error("User salt is missing");
  }

  const hashedPassword = await user.hash(newPassword, user.salt);
  user.password = hashedPassword;

  const updated = await user.save();
  return updated;
};
