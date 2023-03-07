export interface Command {
  id?: string;
  name?: string;
  commands?: string;
  status?: string;
  icon?: string;
  script?: string;
  scriptType?: string;
  parametersNumber?: number;
  parameters?: any[];
  description?: string;
  owner?: string;
  rate?: number;

}
