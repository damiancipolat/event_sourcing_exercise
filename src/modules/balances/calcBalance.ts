import { Event, WithdrawCompleteEvent, DepositCompleteEvent } from '../../domain/events';
import { Transaction } from '../../domain/models';

import ICalcBalance from './ICalcBalance';
import constants from '../transactions/constants';

const calculateBalance: ICalcBalance = (transactions:Event[]) => {
  let total:number = 0;

  transactions.forEach((event:Event) => {
    // Process the money deposit.
    if (event.type === constants.DEPOSIT_COMPLETE) {
      const deposit:DepositCompleteEvent = JSON.parse(event.payload);
      const value:Transaction = deposit.transaction;
      total += value.ammount;
    }

    // Process the money withdraw.
    if (event.type === constants.WITHDRAW_COMPLETE) {
      const withdraw:WithdrawCompleteEvent = JSON.parse(event.payload);
      const value:Transaction = withdraw.transaction;
      total -= value.ammount;
    }
  });

  return total;
};

export default calculateBalance;
