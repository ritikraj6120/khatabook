const host = "http://localhost:5000";
export const getCustomerBalance = () =>
	async (dispatch) => {
		try {
			const response = await fetch(`${host}/api/customer/getCustomerBalance`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"auth-token": localStorage.getItem('token')

				}
			});
			if (response.status === 200) {
				const json = await response.json();
				dispatch({ type: 'FETCH_SUCCESS', payload: json })
			}
			else if (response.status !== 200) {
				dispatch({ type: 'FETCH_ERROR' })
			}
		}
		catch (error) {
			dispatch({ type: 'FETCH_ERROR' })
		}
	}


