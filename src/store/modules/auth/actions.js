export default {

    async login(context, payload) {
        context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },


    async register(context, payload) {

        let url = 'http://localhost:3000/register'

        console.log(payload)


        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                password: payload.password
            })
        });

        const responseData = await response.json()

        // console.log(response)

        if (!response.ok) {
            if (responseData.error.code === 409)
                throw new Error(null)
        }

        // qui tutto ok 
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },




}