import { ActionTypes } from "../actionTypes/action-types";
import {IIAction }from "./contactReducer"


export interface IRegisterDataState {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const initialState:IRegisterDataState= {
  name: "",
  password: "",
  confirmPassword:"",
  email: "",
};

const dataRegisterReducer = (state = initialState, action:IIAction): IRegisterDataState  => {
  switch (action.type) {
    case ActionTypes?.DATA_CHANGE:
      return {...state,...action.payload};
    default:
      return state;
  }
};

export default dataRegisterReducer;
