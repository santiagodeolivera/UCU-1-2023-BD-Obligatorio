import { User } from "./user"

export interface IAuthResponse {
  success: boolean,
  message?: string,
  data?: {
    user: User,
    token: string
  }
}
