import * as bcrypt from 'bcrypt';

export const random = () => bcrypt.genSaltSync(10);
export const authentication = (salt: string, password: string) => {
  return bcrypt.hashSync(password, salt);
};