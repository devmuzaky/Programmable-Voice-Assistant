import {Parameter} from "./parameter";
import {Pattern} from "./pattern";

export interface CommandEditInfoDTO {
  id: number;
  name: string;
  description: string;
  parameters: Parameter[];
  patterns: Pattern[];
  state: string;

  icon?: File;
  script?: File;
  requirements?: File;
  scriptType?: string;
}
