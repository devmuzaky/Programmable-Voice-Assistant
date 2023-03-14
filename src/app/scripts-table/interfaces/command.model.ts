export interface Command {
  requirements?: File;
  id?: string;
  name?: string;
  commands?: string;
  visibility?: string;
  icon?: File;
  script?: File;
  scriptType?: string;
  parametersNumber?: number;
  parameters?: string[];
  description?: string;
  owner?: string;
}
