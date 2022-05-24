const state = {        
    auth_token:null,
    isLoggedIn :false,
    screen_name:null,
}

const getters = {
  AuthToken (state){
      return state.auth_token
  },

  IsLoggedIn(state){
      return state.isLoggedIn
  },

  ScreenName(state){
      return state.screen_name
  }
}

const actions = {
    async signIn({commit}, userData){
        try{
            const url = `${this.$api}users/login`
            const res = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
            })
            const data = await res.json()
            if (data.status === 200){
                commit('SET_AUTH_TOKEN',data.data.auth_token)
                commit('SET_SCREEN_NAME', data.data.screen_name)
                commit('SET_IS_LOGGED_IN',true)
            }
            return data
        }
        catch(err){
            let error = "Seems like you are offline kindly check your connection."
            return error
        }
      }
    }

const mutations = {
    SET_AUTH_TOKEN(state,payload){
        state.auth_token = payload
     },
    
     SET_IS_LOGGED_IN(state,payload){
       state.isLoggedIn = payload
     },
    
     SET_SCREEN_NAME(state, payload){
       state.screen_name = payload
     },
}

export default{
  state,
  getters,
  actions,
  mutations
}