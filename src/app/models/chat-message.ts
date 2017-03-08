import { Vehicle } from './vehicle';

export class ChatMessage {
  type: 'text' | 'vehicle';
  content: string | Vehicle;
}
