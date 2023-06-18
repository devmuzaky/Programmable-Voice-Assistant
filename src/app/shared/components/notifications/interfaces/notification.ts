export interface CommandNotification {
  id: number;
  message: string;
  status: string;

  commandIcon?: string;
}

export const EmptyCommandNotification: CommandNotification = {
  id: 0,
  message: '',
  status: ''
}


