export interface CommandNotification {
  id: number;
  name: string;
  message: string;
  status: string;
  executable_url?: string;
}

export const EmptyCommandNotification: CommandNotification = {
  id: 0,
  name: '',
  message: '',
  status: ''
}


