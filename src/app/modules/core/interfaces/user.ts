

export interface User {
  ci?: string;
  name?: string;
  surname?: string;
  urlPictureID?: string;
  hashPassword?: string;
  isAdmin?: boolean;
  phone?: string;
  geoDistance?: number;
  geoState?: boolean;
  email?: string;
  city: string;
  state: string;
  address: string;
}