import { ActionTypes } from "../actionTypes/action-types";

export interface IContactState {
  name: string;
  company: string;
  phone: string;
  email: string;
}

const initialState:IContactState= {
  name: "Jericho James",
  company: "",
  phone: "",
  email: "",
};

export interface IIAction{
  type?:string
  payload?:Object
}
const counterReducer = (state = initialState, action:IIAction): IContactState=> {
  switch (action.type) {
    case ActionTypes?.INSERT:
      return {...state,...action.payload};
    case ActionTypes?.UPDATE:
      return state;
    case ActionTypes?.DELETE:
      return state;
    default:
      return state;
  }
};

export default counterReducer;
