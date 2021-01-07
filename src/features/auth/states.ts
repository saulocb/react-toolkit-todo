import IAuthentication from "./Interfaces/IAuthentication";
import CommonState from "../../shared/types/models/common/ICommonState";
import IUser from "./Interfaces/IUser";

export default interface AuthState extends CommonState {
  auth?: IAuthentication;
  user?: IUser
}
