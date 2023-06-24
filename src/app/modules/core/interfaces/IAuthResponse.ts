import { IUser } from "./IUser"

export interface IAuthResponse {
  success: boolean,
  message?: string,
  data?: {
    user: IUser,
    token: string
  }
}
