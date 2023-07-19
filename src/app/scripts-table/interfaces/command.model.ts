import {Parameter} from "./parameter";
import {Pattern} from "./pattern";

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


export interface CommandForTableDTO {
  id: number;
  name: string;
  description?: string;
  icon_link: string;
  parameters?: Parameter[];
  patterns: Pattern[];

  state: string;
  script_link: string;
  requirements_link: string;
}

