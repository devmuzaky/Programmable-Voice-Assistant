export interface CommandNotification {
  id: number;
  message: string;
  status: string;

  executableLink?: string;
}

export const EmptyCommandNotification: CommandNotification = {
  id: 0,
  message: '',
  status: ''
}


