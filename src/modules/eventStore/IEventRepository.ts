/* eslint-disable no-unused-vars */
import { Event } from '../../domain/events';

interface IEventRepository {
  save(event: Event): Promise<any>;
  getById(id: number): Promise<Event | null>;
  searchEvent(type:string, likeExp:string): Promise<Event[]>;
}

export default IEventRepository;
