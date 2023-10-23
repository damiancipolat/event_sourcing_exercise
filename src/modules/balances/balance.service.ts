import { Event } from '../../domain/events';
import { searchEvent } from '../eventStore/event.service';

const calc = (eventList:Event[]) => {
  let total = 0;
  let account = '';
  console.log('aaa', eventList);
  eventList.forEach((event) => {
    const { ammount, accountId } = JSON.parse(event.payload).transaction;
    const { type } = event;
    account = accountId;
    if (type === 'depositComplete') {
      total += ammount;
    }

    if (type === 'withdrawComplete' && total >= ammount) {
      total -= ammount;
    }
  });

  return {
    account, total,
  };
};

const getBalance = async (accountId:string):Promise<void> => {
  const typeList:string[] = ['withdrawComplete', 'depositComplete'];
  const result = await searchEvent(typeList, `%"accountId":"${accountId}"%`);
  const final = calc(result);
  console.log('xxxx', final);
};

export default getBalance;
