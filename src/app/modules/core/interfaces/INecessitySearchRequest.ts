import { IDateRange } from "./IDateRange";

export interface INecessitySearchRequest {
  searchTerm?: string;
  skills?: string[];
  startDate?: IDateRange;
  endDate?: IDateRange;
}
