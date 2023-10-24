/* eslint-disable class-methods-use-this */
import { Event } from '../../domain/events';
import eventService from '../eventStore/event.service';
import ICalcBalance from './ICalcBalance';
import calculateBalance from './calcBalance';

class BalanceService {
  private calculator:ICalcBalance = calculateBalance;

  private async recoverTransactions(accountId:string):Promise<Event[]> {
    const typeList:string[] = ['withdrawComplete', 'depositComplete'];
    const result:Event[] = await eventService.search(typeList, `%"accountId":"${accountId}"%`);
    return result;
  }

  public async getBalance(accountId:string):Promise<number> {
    const transactions:Event[] = await this.recoverTransactions(accountId);
    const total:number = this.calculator(transactions);
    return total;
  }
}

export default BalanceService;
