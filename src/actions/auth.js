import apiCall from '../apiCall';
export const signUp = (user) =>
	return (dispatch) => {
			
		
	}

/////////////////////////////////////////////////////////////////////////////////

export const signIn = (dispatch) =>
	async (user) => {
		try {
			dispatch({ type: 'SIGNIN_USER_LOADING' });
			const res = await apiCall('/login', 'post', user);
			dispatch({ type: 'SIGNIN_USER_SUCCESS', payload: res });
		} catch (err) {
			dispatch({ type: 'SIGNIN_USER_FAILURE', payload: err.response.data })
		}
	}
