export interface IRegisterDto {
  email: string;
  password: string;
}

export interface ILoginDto extends IRegisterDto {
  rememberMe: boolean;
}

export interface IRegisterRes {
  addedUser: IUser;
}

export interface IUser {
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  _id: string;
  created: string;
  updated: string;
  __v: number;
  avatar?: string;
}

export interface IProfile extends IUser {
  token: string;
  tokenDeathTime: number;
}
