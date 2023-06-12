import { IGeoConfiguration, IGeolocation } from ".";

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  address?: IGeolocation;
  geoConfiguration?: IGeoConfiguration;
}
