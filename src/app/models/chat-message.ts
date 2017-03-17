import { Car } from './car';

export class ChatMessage {
  type: 'text' | 'vehicle';
  content: string | Car;
}
