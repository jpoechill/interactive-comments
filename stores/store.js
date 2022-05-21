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
    editComment (comment, data) {
      for (let i = 0; i < this.data.comments.length; i++) {
        if (this.data.comments[i].id === comment.id) {
          comment.showEdit = false
          this.data.comments[i].content = data;
          break;
        }
        
        if (this.data.comments[i].replies) {
          for (let t = 0; t < this.data.comments[i].replies.length; t++) {
            if (this.data.comments[i].replies[t].id === comment.id) {
              comment.showEdit = false
              this.data.comments[i].replies[t].content = data;
              break;
            }
          }
        }
      }
    },
    addComment (payload) {
      this.data.comments.push(payload)
    },
    addReply (commentID, payload) {
      this.data.comments.find((x) => x.id == commentID).replies.push(payload)
    },
    deleteReply (commentID, data) {
      // ...
      console.log('hello')
    },
    deleteComment (commentID) {
      this.data.comments = this.data.comments.filter((comment) => {
        comment.replies = comment.replies.filter((reply) => {
          return reply.id !== commentID
        })

        return comment.id !== commentID
      })
    },
    sayHello (payload) {
      this.data.comments.push(payload)
    }
  },
  getters:{
    getComments:(state) => state.data.comments,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
