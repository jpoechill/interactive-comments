import { defineStore, acceptHMRUpdate} from 'pinia'
import data from '~~/stores/data.json'

// use state to mutate local (store) vars
// use state to mutate server (gql) vars

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      data: data,
    }
  },
  actions:{
    // do stuff ...
    editReply (commentID, data) {
        // ...
    },
    editComment (commentID, data) {
    // ...
    },
    addComment (data) {
    // ...
    },
    addReply (commentID, data) {
    // ...
    },
    deleteReply (commentID, data) {
    // ...
    },
    deleteComment (commentID, data) {
    // ...
    },
  },
  getters:{
    getComments:(state) => state.data.comments,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
