let initialState = {
	user: null,
	isAuthenticated: false,
	isadmin:false,
	signUpErr: '',
	signInErr: ''
  

};
  

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER_SUCCESS':
		return { ...state, user: action.payload.user, isAuthenticated: true };
    case 'SIGNUP_USER_FAILURE':
      console.log(action)
      return { ...state, signUpErr: action.payload.error };

    // case 'SET_CURRENT_USER_SUCCESS':
    //   return { ...state, user: action.payload };
      
      // Sign in cases
    case 'SIGNIN_USER_SUCCESS':
		// var decoded = jwt_decode(token);
		return { ...state, user: action.payload.user, isAuthenticated: true };
    case 'SIGNIN_USER_FAILURE':
      console.log(action);
      return { ...state, signInErr: action.payload.error }
    default:
      return state;
  }
}


