import * as types from './mutation-types'
import {polyfill} from 'es6-promise';
import fetch from 'isomorphic-fetch';

polyfill();

export const fetchList = ({ commit }) => {
    return fetch('http://0.0.0.0:8081/json').then((response)=>{
        return response.json();
    }).then((listData)=>{
        commit(types.REPLACE_LIST, listData);
    }, (error) => {
        console.log(error)
    });
};