

import * as types from '../../../types/community';



export const reducer = (state={}, action) => {

    if (action.type == types.TEST_BLOCK_DISPATCH) {
        console.log("types.TEST_BLOCK_DISPATCH ", types.TEST_BLOCK_DISPATCH);
        return state
    }


    console.log("tab reducer!!!!!!!", state, action);

  return state;

};