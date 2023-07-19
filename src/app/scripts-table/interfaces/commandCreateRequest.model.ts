import {Parameter} from "./parameter";

export interface CommandCreateRequest {
  name: string;
  description: string;
  parameters: Parameter[];
  patterns: string[];
  script_data: {
    script: File,
    requirements: File,
    scriptType: string
  };
  patternsNumber: number;
  icon: File;
  visibility: string;
}
