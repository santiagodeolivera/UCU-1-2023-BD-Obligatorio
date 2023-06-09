import { IGeolocation, IPostulation } from ".";

export interface INecessity {
  id?: string;
  userId?: string;
  description?: string;
  status?: string;
  createdDate?: Date;
  startDate?: Date;
  endDate?: Date;
  solvedDate?: Date;
  location?: IGeolocation;
  postulations?: IPostulation[];
}
