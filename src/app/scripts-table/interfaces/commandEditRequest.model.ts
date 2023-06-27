import {Parameter} from "./parameter";

export interface CommandEditRequest {
  id: number;
  name?: string;
  description?: string;
  parameters?: Parameter[];
  patterns?: string[];
  script_data?: {
    script: File,
    requirements: File,
    scriptType: string
  };

  visibility?: string;
  icon?: File;
  patternsNumber?: number;
}
