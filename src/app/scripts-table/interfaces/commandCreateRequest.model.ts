export interface CommandCreateRequest {
  name: string;
  description: string;
  parameters: string[];
  patterns: string[];
  script_data: {
    script: File,
    requirements: File,
    scriptType: string
  };

  visibility?: string;
  icon: File;
  patternsNumber: number;
}
