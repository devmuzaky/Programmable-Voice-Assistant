import {Parameter} from "./parameter";

export interface Command {
  patternsNumber?: number;
  requirements?: File;
  id?: string;
  name?: string;
  patterns?: string[];
  visibility?: string;
  icon?: File;
  script?: File;
  scriptType?: string;
  parametersNumber?: number;
  parameters?: Parameter[];
  description?: string;
  owner?: string;
}
