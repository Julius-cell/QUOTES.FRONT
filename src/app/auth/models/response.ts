import { User } from "./user";

export interface RespUser {
  status: string,
  token?: string,
  data?: User,
  expires?: string,
  error?: string
}