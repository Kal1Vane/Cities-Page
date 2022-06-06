import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
