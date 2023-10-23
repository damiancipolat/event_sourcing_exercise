/* eslint-disable no-unused-vars */
import { Event } from '../../domain/events';

interface IEventRepository {
  save(event: Event): Promise<any>;
  getById(id: string): Promise<Event | null>;
  searchEvent(typeList:string[], likeExp:string): Promise<Event[]>;
}

export default IEventRepository;
