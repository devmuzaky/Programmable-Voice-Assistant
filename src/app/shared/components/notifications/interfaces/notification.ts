export interface CommandNotification {
  id: number;
  message: string;
  time: string;

  // optional url to the icon
  commandIcon?: string;
}

export const EmptyCommandNotification: CommandNotification = {
  id: 0,
  message: '',
  time: '',
}


