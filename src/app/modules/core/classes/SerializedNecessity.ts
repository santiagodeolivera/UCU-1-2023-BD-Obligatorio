import { IGeolocation, INecessity, IPostulation, ISkill, IUser } from "../interfaces";

export class SerializedNecessity implements INecessity {
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

  constructor(necessity: INecessity) {
    Object.assign(this, necessity || {});

    this.createdDate =  typeof this.createdDate === 'string' ? new Date(this.createdDate) : this.createdDate;
    this.startDate = typeof this.startDate === 'string' ? new Date(this.startDate) : this.startDate;
    this.endDate = typeof this.endDate === 'string' ? new Date(this.endDate) : this.endDate;
    this.solvedDate = typeof this.solvedDate === 'string' ? new Date(this.solvedDate) : this.solvedDate;
  }
}
