import { User } from "./user";

export interface RespUser {
  status: string,
  token?: number,
  data?: User
  error?: string
}