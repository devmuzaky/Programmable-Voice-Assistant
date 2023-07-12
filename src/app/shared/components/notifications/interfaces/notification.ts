export interface CommandNotification {
  id: number;
  name: string;
  message: string;
  status: string;
  executable_url?: string;
  type?: string
}

export const EmptyCommandNotification: CommandNotification = {
  id: 0,
  name: '',
  message: '',
  status: ''
}


