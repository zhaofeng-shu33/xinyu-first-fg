/*
 *
 * userProfile reducer
 *
 */

  const DEVICE_MOBILE_SET = 'DEVICE_MOBILE_SET';
  // The initial state
  const initialState = {isMobile: false};
  
  export function deviceReducer(state = initialState, action) {
    switch (action.type) {
      case DEVICE_MOBILE_SET:
        return Object.assign({}, state, {
          'isMobile': true
        })
      default:
        return state;
    }
  }
export const setMobile = () => {
    return {
      type: DEVICE_MOBILE_SET
    };
  };  