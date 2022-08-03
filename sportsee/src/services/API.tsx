import Mock from './MockAPI'

class API {

    getUser() {
        return new Promise((resolve, reject) => {

            return fetch('http://localhost:3000/user/18')
                .then(res => res.json())
                .then(
                    (result) => resolve(result)
                )
                .catch(function (error) {
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                    reject(error)
                });

        })

    }

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

    getActivityData() {

        return fetch('http://localhost:3000/user/12/activity')
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

    getPerfData() {

        return fetch('http://localhost:3000/user/12/performance')
            .then(res => res.json())
            .then(
                (result) => result
            )
            .then(
                (result) => {
                    result?.data?.data.map((key: any) => {
                        let keys = result?.data?.kind[key.kind]
                        console.log(keys)
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

console.log(process.env)


export default process.env.REACT_APP_MOCK == "1" ? new Mock() : new API()
