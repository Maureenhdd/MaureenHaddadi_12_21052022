import Mock from './MockAPI'

/**
 * Service for API call
 * @Class
 * @name API
 *
 * 
 *
 */

class API {


	/**
	 * Method to get information data of the user connected
	 * @method
	 * @name getUser
	 *
	 * @return {Object} call result
	 *
	*/

	getUser() {
		return fetch('http://localhost:3000/user/18')
			.then(res => res.json())
			.then(
				(result) => result
			)
			.catch(function (error) {
				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
				throw error
			});
	}

	/**
	 * Method to get the score data of the user connected
	 * @Method
	 * @name getScoreData
	 *
	 * @return {number} call result
	 *
	 */

	getScoreData() {

		return fetch('http://localhost:3000/user/18')
			.then(res => res.json())
			.then(
				(result) => result
			)
			.then(
				(result) => result.data.score
			)
			.catch(function (error) {
				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
				throw error
			});

	}
	/**
	 * Method to get the score data of the user connected
	 * @Method
	 * @name getSessionData
	 *
	 * @return {Array} call result
	 *
	 */
	getSessionData() {

		return fetch('http://localhost:3000/user/18/average-sessions')
			.then(res => res.json())
			.then(
				(result) => result
			)
			.then(
				(result) => result.data.sessions
			)
			.catch(function (error) {
				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
				throw error
			});

	}


	/**
	 * Method to get the score data of the user connected
	 * @Method
	 * @name getActivityData
	 *
	 * @return {Array} call result
	 *
	 */

	getActivityData() {

		return fetch('http://localhost:3000/user/18/activity')
			.then(res => res.json())
			.then(
				(result) => result
			)
			.then(
				(result) => result.data.sessions
			)
			.catch(function (error) {
				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
				throw error
			});


	}

	/**
	 * Method to get the score data of the user connected
	 * @Method
	 * @name getPerfData
	 *
	 * @return {Array} call result
	 *
	 */

	getPerfData() {

		return fetch('http://localhost:3000/user/18/performance')
			.then(res => res.json())
			.then(
				(result) => result

			)
			.then(

				(result) => {
					result?.data?.data.map((key: any) => {
						let keys = result?.data?.kind[key.kind]
						key.kind = keys.charAt(0).toUpperCase() + keys.slice(1)

					})

					return result?.data?.data
				}
			)

			.catch(function (error) {
				console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
				throw error
			});


	}



}




export default process.env.REACT_APP_MOCK == "1" ? new Mock() : new API()


