import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    listData: []
};

// there could be actions and getters

// mutations
const mutations = {
    [types.REPLACE_LIST] (state, listData) {
        state.listData = listData;
    },
};

export default {
    state,
    mutations
}