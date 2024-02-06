import {ActionTypes} from "../actionTypes/action-types"

export const contactInsert=(data: any)=>{
   return {
    type:ActionTypes.INSERT,
    payload:data
   }
}

export const contactUpdate=(data: any)=>{
    return {
     type:ActionTypes.UPDATE,
     payload:data
    }
 }

 export const contactDELETE=(data: any)=>{
    return {
     type:ActionTypes.DELETE,
     payload:data
    }
 }
 export const contacTSEARCH=(data: any)=>{
    return {
     type:ActionTypes.SEARCH,
     payload:data
    }
    
 }

 export const contactDataDetails=(key: any)=>{
   return {
    type:ActionTypes.DATA_CHANGE,
    payload:key
   }
}
export const contactLoginDetails=(data: any)=>{
   return {
    type:ActionTypes.LOGIN,
    payload:data
   }
}