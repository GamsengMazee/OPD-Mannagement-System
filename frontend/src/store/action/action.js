export const STORE_TOKEN = "STORE_TOKEN";

export const storeToken = (currentTokenNo) => {
   
  return {
    type: STORE_TOKEN,
    currentTokenNo ,
  };
};
