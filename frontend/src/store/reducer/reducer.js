import { STORE_TOKEN } from "../action/action";


const initialState = {
  currentTokenNo: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
        const currentToken = action.currentTokenNo
         console.log('reducedddddd')
      return {
         currentTokenNo: currentToken
      };
    
    default:
      return state;
  }
};


export default reducer;
