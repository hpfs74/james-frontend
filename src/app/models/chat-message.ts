import { Car } from './car';

export class ChatMessage {
  type: 'text' | 'car';
  content: string | Car;
}
