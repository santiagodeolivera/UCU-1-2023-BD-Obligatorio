import { User } from "./user"

export interface AuthResponse {
  success: boolean,
  message?: string,
  data?: {
    user: User,
    token: string
  }
}