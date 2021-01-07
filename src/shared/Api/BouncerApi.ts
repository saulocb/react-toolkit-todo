import axios, { AxiosResponse } from "axios";
import ILoginForm from "../../features/auth/Interfaces/IAuthForm";
import config from "./apiConfig";
import IAuthentication from "../../features/auth/Interfaces/IAuthentication";
import ISignUpForm from "../../features/auth/Interfaces/ISignUpForm";
import IAddShiftForm from "../../features/shift/Interfaces/IAddShiftForm";
import IShift from "../../features/shift/Interfaces/IShift";
import { LocalStorageService } from "../services/localStorage";
import IUser from "../../features/auth/Interfaces/IUser";

export class BouncerApi {
  // AUTH

  postLogin(login: ILoginForm): Promise<AxiosResponse<IAuthentication>> {
    const url = `${config.bouncerApi}/Users/login`;
    return axios.post<IAuthentication>(url, { ...login },
      {
        headers: { 'Content-Type': 'application/json'},
      }
      );
  }

  postUser$(formCompany: ISignUpForm): Promise<AxiosResponse<IUser>> {
    const url = `${config.bouncerApi}/Users`;
    return axios.post<IUser>(url, { ...formCompany });
  }

  getLocaUserId(): string {
    const userId = LocalStorageService.getItem("userId");
    return userId;
  }

  // SHIFT

  postShift$(shiftForm: IAddShiftForm): Promise<AxiosResponse<any>> {
    const url =  `${config.bouncerApi}/shifts?access_token=${this.authHeader()}`;
    return axios.post<IAuthentication>(url, { ...shiftForm },      {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  putShift$(shift: IShift): Promise<AxiosResponse<any>> {
    const url = `${config.bouncerApi}/shifts?access_token=${this.authHeader()}`;
    return axios.put<IAuthentication>(
      url,
      { ...shift },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  removeShift$(shiftId?: string): Promise<AxiosResponse<any>> {
    const url = `${
      config.bouncerApi
    }/shifts/${shiftId}?access_token=${this.authHeader()}`;
    return axios.delete<IAuthentication>(url);
  }

  getALlShift$(): Promise<AxiosResponse<IShift[]>> {
    let filter = `[where][userId]=${this.getLocaUserId()}`;
    const url = `${
      config.bouncerApi
    }/shifts?filter${filter}&?access_token=${this.authHeader()}`;
    return axios.get<IShift[]>(url);
  }

  getEntityIdFromUrl(url: string): number {
    const urlSegments = url.split("/").filter((x) => x !== "");
    return parseInt(urlSegments[urlSegments.length - 1]);
  }

  authHeader() {
    let token = LocalStorageService.getItem("token");
    return token;
  }
}
