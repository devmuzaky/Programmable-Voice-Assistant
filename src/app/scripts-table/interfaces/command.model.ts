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
  parameters?: string[];
  description?: string;
  owner?: string;
}
