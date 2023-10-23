import { searchEvent } from '../eventStore/event.service';

const calcBalance = async (accountId:string):Promise<void> => {
  const typeList:string[] = ['withdrawComplete', 'depositComplete'];
  const result = await searchEvent(typeList, `%"accountId":"${accountId}"%`);
  console.log('xxxx', result);
};

export default calcBalance;
