import { LocalStorageService } from "../../../services/localStorage";

export default class CommonState {
    isFetching?: boolean; 
    fetchingProgressValue?: number = 0
    fetchingProgressMessage?: string = ''
    error: string  | null =  null
    hasError?: false =  false
    isFulfilled?: false =  false
    isSignedIn?: boolean | false;
    

    constructor(){
        this.isSignedIn =  LocalStorageService.getItem("token") ? true : false
    }
}