export interface UserLoginCredentials {
  password: string;
  username: string;
}

export interface UserStructure extends UserLoginCredentials {
  email: string;
}
