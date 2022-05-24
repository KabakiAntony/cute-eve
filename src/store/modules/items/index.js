const state = {        
    items:[]
}

const getters = {
    Items(state){
        return state.items
    }
}

const actions = {
   async getItems ({commit, rootState}){
        const token = rootState.auth.auth_token
        try{
          const url = `${this.$api}items`
          const res = await fetch(url,{
          method:'GET',
          headers:{
            'auth_token': token
          },
          })
          const data = await res.json()
          if (data.status === 200){
              commit('SET_TODOS',data.data)
          }
          else if(data.status === 404){
            commit('RESET_TODOS')
          }
          return data
        }
        catch(err)
        {
          return err
    
        }
     }
}

const mutations = {
    SET_ITEMS (state,payload){
        state.items = payload
     },

    RESET_ITEMS(state){
        state.items.length = 0;
     }
}

export default{
  state,
  getters,
  actions,
  mutations
}