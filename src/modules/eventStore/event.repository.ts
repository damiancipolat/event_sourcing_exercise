import knex from 'knex';
import knexConfig from '../../knex';
import { Event } from '../../domain/events';
import IEventRepository from './IEventRepository';

class EventRepository implements IEventRepository {
  private knexInstance;

  constructor() {
    this.knexInstance = knex(knexConfig);
  }

  async save(event: Event): Promise<any> {
    const inserted = await this.knexInstance('events').insert(event);
    return inserted;
  }

  async getById(id: number): Promise<Event | null> {
    const event: Event = await this.knexInstance('events').select('*').where({ id }).first();
    return event;
  }

  async searchEvent(typeList:string[], likeExp:string): Promise<Event[]> {
    const events: Event[] = await this.knexInstance('events')
      .select('*')
      .whereIn('type', typeList)
      .andWhere('payload', 'like', `${likeExp}`)
      .orderBy('id', 'asc');

    return events;
  }
}

export default EventRepository;
