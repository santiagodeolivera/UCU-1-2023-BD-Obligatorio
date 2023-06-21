import { IPostulation } from "../interfaces";
import { SKILLS_MOCK } from "./skills.mock";

export const POSTULATIONS_MOCK: IPostulation[] = [
  {
    necessityId: '1',
    userId: '54616473',
    user: {
      name: 'Alberto Fernández',
      skills: SKILLS_MOCK.slice(0, 2),
      email: 'albertitere@gub.ar'
    },
    status: 'Pendiente',
    createdDate: new Date()
  },
  {
    necessityId: '1',
    userId: '2',
    user: {
      name: 'Luis Alberto Lacalle Pou',
      skills: SKILLS_MOCK.slice(2, 5),
      email: 'luisitolacalle@gub.uy',
      phoneNumbers: [
        '23142143213',
        '09342849324'
      ]
    },
    status: 'Aprobada',
    createdDate: new Date()
  },
  {
    necessityId: '1',
    userId: '3',
    user: {
      name: 'Diego Maradona',
      skills: SKILLS_MOCK,
      email: 'lamanodedios@fulbo.com'
    },
    status: 'Pendiente',
    createdDate: new Date()
  }
];
