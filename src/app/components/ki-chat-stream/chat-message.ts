import { Vehicle } from '../../models/vehicle';

export class ChatMessage {
  type: 'text' | 'vehicle';
  content: string | Vehicle;
}
