import { IPostulation } from "../interfaces";
import { SKILLS_MOCK } from "./skills.mock";

export const POSTULATIONS_MOCK: IPostulation[] = [
  {
    necessityId: '1',
    userId: '54616473',
    user: {
      name: 'Alberto Fernández',
      skills: SKILLS_MOCK.slice(0, 2)
    },
    status: 'Pendiente',
    createdDate: new Date()
  },
  {
    necessityId: '1',
    userId: '2',
    user: {
      name: 'Luis Alberto Lacalle Pou',
      skills: SKILLS_MOCK.slice(2, 5)
    },
    status: 'Pendiente',
    createdDate: new Date()
  },
  {
    necessityId: '1',
    userId: '3',
    user: {
      name: 'Diego Maradona',
      skills: SKILLS_MOCK
    },
    status: 'Pendiente',
    createdDate: new Date()
  }
];
