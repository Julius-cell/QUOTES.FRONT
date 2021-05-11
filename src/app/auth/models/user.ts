export interface User {
  _id?: string,
  role?: string,
  email: string,
  name: string,
  active?: boolean,
  passwordChangedAt?: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface UserRegister {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}