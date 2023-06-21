import { IGeolocation, IPostulation, ISkill, IUser } from ".";

export interface INecessity {
  id?: string;
  userId?: string;
  title?: string;
  description?: string;
  status?: string;
  createdDate?: Date;
  startDate?: Date;
  endDate?: Date;
  solvedDate?: Date;
  location?: IGeolocation;
  user?: IUser;
  postulations?: IPostulation[];
  skills?: ISkill[];
}
