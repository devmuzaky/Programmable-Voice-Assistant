export interface Command {
  requirements?: File;
  id?: string;
  name?: string;
  commands?: string;
  status?: string;
  icon?: File;
  script?: File;
  scriptType?: string;
  parametersNumber?: number;
  parameters?: any[];
  description?: string;
  owner?: string;
}
