interface IUserCreate {
  name: string;
  email: string;
  username: string;
  password: string;
  is_super?: boolean;
}

export { IUserCreate };