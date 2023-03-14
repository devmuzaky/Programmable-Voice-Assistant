export interface CommandCreateRequest {
  name: string;
  description: string;
  visibility: string;
  scriptType: string;
  parameters: string[];
  icon: File;
  script: File;
  requirements: File;
}
