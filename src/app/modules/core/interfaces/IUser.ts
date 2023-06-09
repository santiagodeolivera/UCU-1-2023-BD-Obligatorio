import { IGeoConfiguration, IGeolocation } from ".";

export interface IUser {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  address?: IGeolocation;
  geoConfiguration?: IGeoConfiguration;
}
