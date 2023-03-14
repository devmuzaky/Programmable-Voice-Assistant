export interface CommandCreateRequest {
  name: string;
  description: string;
  status: string;
  scriptType: string;
  parameters: string[];
  icon: File;
  script: File;
  requirements: File;
}
