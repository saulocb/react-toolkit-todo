import IShift from "../Interfaces/IShift";

export default class Shift implements IShift {
  id: string;
  userId?: string;
  qdtBouncer: number;
  creationDate?: Date
  pay: string;
  interval: string;

  constructor(
    id ='',
    userId = '',
    qdtBouncer = 0,
    creationDate = new Date(),
    pay = "",
    interval = ""
  ) {
    this.id = id;
    this.userId = userId;
    this.qdtBouncer = qdtBouncer;
    this.creationDate = creationDate;
    this.pay = pay;
    this.interval = interval;
  }
}
