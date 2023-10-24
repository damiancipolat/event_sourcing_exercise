/* eslint-disable no-unused-vars */
import { Event } from '../../domain/events';

interface ICalcBalance {
    (transactions:Event[]): number;
}

export default ICalcBalance;
