let initialState = {
	loading: true,
	error: '',
	customerBalance: []
}
export const CustomerBalanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				error: '',
				customerBalance: action.payload
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				error: 'Something Went wrong!',
				customerBalance: []
			}
		default:
			return state
	} 
}