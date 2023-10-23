import knex from 'knex';
import { Event } from '../../domain/events';
import IEventRepository from './IeventRepository';

class EventRepository implements IEventRepository {
  private knexInstance;

  constructor() {
    this.knexInstance = knex;
  }

  async save(event: Event): Promise<any> {
    const inserted = await this.knexInstance('events').insert(event);
    return inserted;
  }

  async getById(id: string): Promise<Event | null> {
    const event: Event = await this.knexInstance('events').select('*').where({ id }).first();
    return event;
  }

  async searchEvent(type:string, likeExp:string): Promise<Event[]> {
    const events: Event[] = await this.knexInstance('events')
      .select('*')
      .where({ type })
      .andWhere('payload', 'like', `${likeExp}`);

    return events;
  }
}

export default EventRepository;
