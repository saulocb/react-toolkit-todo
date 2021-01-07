import CommonState from "../../shared/types/models/common/ICommonState";
import IShift from "./Interfaces/IShift";
import Shift from "./Models/Shift";

export default class ShiftState extends CommonState {
  myShifts: IShift[];
  selectedShift: IShift | null = null

  constructor() {
    super();
    this.myShifts = new Array<Shift>();
  }
}
