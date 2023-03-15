export interface CommandCreateRequest {
  name: string;
  description: string;
  parameters: string[];
  patterns: string[];
  script: File;
  scriptType: string;
  visibility: string;
  requirements: File;
  icon: File;
  patternsNumber: number;
}
