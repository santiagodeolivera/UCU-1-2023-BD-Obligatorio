import { INecessity, IUser } from ".";

export interface IPostulation {
  necessityId?: string;
  necessity?: INecessity;
  userId?: string;
  user?: IUser;
  status?: string;
  createdDate?: Date;
}
