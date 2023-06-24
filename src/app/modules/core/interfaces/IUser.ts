import { IGeoConfiguration, IGeolocation, ISkill } from ".";

export interface IUser {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumbers?: string[];
  isAdmin?: boolean;
  address?: IGeolocation;
  geoConfiguration?: IGeoConfiguration;
  skills?: ISkill[]
}
