import { INecessity } from "../interfaces";

export const NECESSITY_MOCK: INecessity = {
  id: '1',
  createdDate: new Date(),
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum purus',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dictum purus leo, vel lacinia magna blandit pulvinar. Quisque laoreet vehicula neque eget varius. Praesent eu viverra libero, eu pulvinar eros. Suspendisse vitae quam a mauris iaculis fermentum et ac dui. Suspendisse fringilla metus ex, a auctor massa convallis eu. Integer vel condimentum lacus, at ultrices massa. Aliquam est lorem, aliquet at dictum id, rutrum quis magna. Fusce hendrerit ultrices orci a ultricies.',
  startDate: new Date(new Date().getTime() + 360000000),
  endDate: new Date(new Date().getTime() + 360000000),
  status: 'Pendiente',
  userId: '54616473',
  location: {
    latitude: -34.8825235,
    longitude: -56.1812066
  },
  skills: [
    { name: 'Carpintería', id: 'test1' },
    { name: 'Herrería', id: 'test2' },
    { name: 'Repostería', id: 'test3' },
    { name: 'Actuación', id: 'test4' },
    { name: 'Informática', id: 'test5' },
    { name: 'Cerrajería', id: 'test6' },
    { name: 'Cerámica', id: 'test7' },
  ]
};
