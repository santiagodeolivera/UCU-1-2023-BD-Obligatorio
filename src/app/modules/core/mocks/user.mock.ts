import { User } from "../interfaces/user";
import { IUser } from "../interfaces";


export const MOCKED_USER: User = {
  ci: '123456789',
  name: 'John',
  surname: 'Doe',
  urlPictureID: 'https://picsum.photos/200',
  hashPassword: '123456',
  isAdmin: false,
  phone: '123456789',
  geoDistance: 0,
  geoState: false,
  email: 'prueba@prueba.com',
  location: {
    latitude: -34.8825235,
    longitude: -56.1812066
  }
};


export const USER_MOCK: IUser = {
  id: '54616473',
  name: 'Norberto',
  email: 'norbertito@hotmail.com',
  phoneNumbers: [
    '23142143213',
    '09342849324'
  ],
  skills: [
    {
      name: 'Carpintería',
      description: 'Soy carpintero y me gusta carpintear'
    },
    {
      name: 'Magia',
      description: 'Soy carpintero y me gusta magiquear'
    }
  ]
};