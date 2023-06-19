import { ISkill } from "./ISkill";

export interface ISearchResult {
  iconUrl?: string;
  title?: string;
  url?: string;
  content?: string;
  skills?: ISkill[];
}
