import { ActionTypes } from "../actionTypes/action-types";
import {IIAction }from "./contactReducer"
export interface ICredentialState {
  id:string
  user:string
  pwd:string
  roles:string[]
  accessToken:string
}

const initialState: ICredentialState= {
  id:"",
  user: "",
  pwd: "",
  roles: [],
  accessToken: ""
};
const credentialReducer = (state = initialState, action:IIAction): ICredentialState=> {
  switch (action.type) {
    case ActionTypes?.LOGIN:
      return {...state,...action.payload};
    default:
      return state;
  }
};

export default credentialReducer;
