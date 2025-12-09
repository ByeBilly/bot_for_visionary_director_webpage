export interface Message {
  role: 'user' | 'model';
  content: string;
  id: string;
}

export interface WaitlistData {
  name: string;
  email: string;
}

export enum ChatStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  STREAMING = 'STREAMING',
  ERROR = 'ERROR'
}
