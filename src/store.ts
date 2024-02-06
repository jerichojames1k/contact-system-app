
import { Reducer, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or another storage provider
import { encryptTransform } from 'redux-persist-transform-encrypt'
import rootReducer from './reducers/rootReducer';
import { IContactState } from './reducers/contactReducer';
import { ICredentialState } from './reducers/credentialReducer';
import {IRegisterDataState} from './reducers/dataRegisterReducer'

const encryptor = encryptTransform({
  secretKey: process.env.REACT_APP_API_KEY as string, // Replace with your secret key
  onError: function (error) {
    console.log(error)
  },
});



// Configure the persist options with encryption transformation
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
};
type TDataReducer=Reducer<{contact:IContactState,registerInputData:IRegisterDataState,credentialReducer:ICredentialState}>
const persistedReducer = persistReducer(persistConfig, rootReducer as TDataReducer);


// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export {store ,persistor}
