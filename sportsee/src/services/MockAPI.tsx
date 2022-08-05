class Mock {
    getUser() {
        const data = { "data": { "id": 13, "userInfos": { "firstName": "John", "lastName": "Ratorez", "age": 34 }, "score": 0.5, "keyData": { "calorieCount": 1300, "proteinCount": 60, "carbohydrateCount": 100, "lipidCount": 90 } } }

        return data
    }

    getScoreData() {



        return 0.5

    }

    getSessionData() {

        const data = [{ "day": 1, "sessionLength": 50 }, { "day": 2, "sessionLength": 30 }, { "day": 3, "sessionLength": 25}, { "day": 4, "sessionLength": 20 }, { "day": 5, "sessionLength": 60 }, { "day": 6, "sessionLength": 60 }, { "day": 7, "sessionLength": 30 }]

        return data

    }

    getActivityData() {
        const data = [{ "day": "2020-07-01", "kilogram": 50, "calories": 200 }, { "day": "2020-07-02", "kilogram": 50, "calories": 320 }, { "day": "2020-07-03", "kilogram": 51, "calories": 200 }, { "day": "2020-07-04", "kilogram": 52, "calories": 120 }, { "day": "2020-07-05", "kilogram": 51, "calories": 100 }, { "day": "2020-07-06", "kilogram": 53, "calories": 150 }, { "day": "2020-07-07", "kilogram": 50, "calories": 300 }]


        return data


    }

    getPerfData() {

        const data: any = { "data": { "userId": 12, "kind": { "1": "cardio", "2": "energy", "3": "endurance", "4": "strength", "5": "speed", "6": "intensity" }, "data": [{ "value": 10, "kind": 1 }, { "value": 120, "kind": 2 }, { "value": 300, "kind": 3 }, { "value": 250, "kind": 4 }, { "value": 100, "kind": 5 }, { "value": 100, "kind": 6 }] } }

        data.data?.data.map((key: any) => {
            let keys = data?.data?.kind[key.kind]
            console.log(keys)
            key.kind = keys.charAt(0).toUpperCase() + keys.slice(1)


        })

        return data.data.data
    }
}


export default Mock