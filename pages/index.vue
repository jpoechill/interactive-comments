<template>
  <div>
    <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full max-w-[9/10] md:max-w-[400px] h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg py-2 pb-1 shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex justify-between items-start p-4">
                    <h3 class="text-xl pl-2 font-semibold text-gray-900 dark:text-white">
                        Delete Comment
                    </h3>
                    <button @click="toggleModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                <!-- Modal body -->
                <div class="px-6 py-1">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this comment? This will remove the comment and can’t be undone.    
                    </p>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 rounded-b">
                    <button @click="toggleModal()" type="button" class="text-white bg-[#67727E] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      NO, CANCEL
                    </button>
                    <button @click="deleteComment()" type="button" class="font-bold bg-[#ED6368] text-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                      YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    </div>


    <div class="container mx-auto max-w-[730px] mt-[64px] mb-16 px-5 md:px-0">

      <!-- List Items -->
      <div v-for="(comment, index) in store.data.comments" :key="index" class="">
        <div class="bg-white p-3 rounded-[8px] mb-5">
          <div class="flex justify-between w-full p-4 py-2">
            <div class="flex-none content-center w-[40px] h-[100px] bg-v-light-gray p-2 rounded-[10px] hidden md:block">
              <div class="flex flex-col justify-between items-center h-full h-full py-1">
                <img @click="upVote(comment.id)" src="/icon-plus.svg" alt="Upvote" role="button">
                <span class="font-bold moderate-blue"> 
                  {{ comment.score }}
                </span>
                <img @click="downVote(comment.id)" src="/icon-minus.svg" alt="Downvote" role="button"> 
              </div>
            </div>
            <div class="pl-0 md:pl-5 w-full">
              <div class="flex w-100 justify-between">
                <div>
                  <img :src="comment.user.image.png" :alt="comment.user.username + 'Avatar'" class="inline h-[32px]">
                  <span class="dark-blue font-bold px-4">
                    {{ comment.user.username }} 
                  </span>
                  <span class="grey-blue">
                    {{ comment.createdAt }}
                  </span>
                </div>
                <div class="invisible md:visible group"> 
                  <svg width="14" height="13"  class="fill-[#5357B6] group-hover:fill-[#C5C6EF] mb-1 mr-1 inline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                  </svg>
                  <span @click="comment.showReply = !comment.showReply; " class="text-[#5357B6] font-bold group-hover:text-[#C5C6EF]" role="button">
                    Reply
                  </span>
                </div>
              </div>
              <div class="mt-4 grey-blue">
                {{ comment.content }}
              </div>

              <!-- Mobile Options -->
              <div class="flex md:hidden justify-between">
                <div class="flex-none justify-between w-[100px] h-[40px] bg-v-light-gray mt-4 p-2 rounded-[10px]">
                  <div class="flex justify-between items-center h-full h-full py-1">
                    <img @click="upVote(comment.id)" src="/icon-plus.svg" alt="Upvote" role="button">
                    <span class="font-bold moderate-blue"> 
                      {{ comment.score }}
                    </span>
                    <img @click="downVote(comment.id)" src="/icon-minus.svg" alt="Downvote" role="button"> 
                  </div>
                </div>
                <div class="group pt-6">
                  <svg width="14" height="13"  class="fill-[#5357B6] group-hover:fill-[#C5C6EF] mb-1 mr-1 inline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                  </svg>
                  <span @click="comment.showReply = !comment.showReply" class="text-[#5357B6] font-bold group-hover:text-[#C5C6EF]" role="button">
                    Reply
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- Replies -->
        <div v-if="comment.replies.length" class="px-0 rounded-[8px] mb-5 flex justify-between">
          
          <!-- Vertical Line -->
          <div class="min-h-full pr-4 border-l-[#E9EBF0] border-l-[2px] md:hidden"></div>

          <div class="px-6 min-h-full hidden md:block">
            <div class="w-[40px] h-full">
              <div class="w-[24px] border-r-[#E9EBF0] border-r-[2px] h-full">
              </div>
            </div>
          </div>

          <!-- Comment Replies -->
          <div class="w-full">

            <!-- Inner Level Add Reply -->
            <div v-if="comment.showReply" class="bg-white w-full p-3 py-5 mb-5 rounded-[8px] flex justify-between hidden md:flex">
              <div class="px-4 min-h-full">
                <div class="w-[40px] h-full">
                  <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                </div>
              </div>
              <textarea v-model="comment.reply" placeholder="Add reply..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]">
              </textarea>
              <button @click="addReply(comment)" class="text-white px-3 b-moderate-blue h-[48px] mr-3 min-w-[104px] rounded-[8px] font-bold">REPLY</button>
            </div>


            <!-- Inner Level Add Reply // Mobile View -->
            <div v-if="comment.showReply" class="bg-white w-full p-3 mb-5 py-5 rounded-[8px] md:hidden">
              <textarea placeholder="Add comment..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
              <div class="flex justify-between mt-3">
                <div class="min-h-full">
                  <div class="w-[40px] h-full">
                    <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                  </div>
                </div>
                <button @click="addReply(comment)" class="text-white px-3 b-moderate-blue h-[48px] mr-3 min-w-[104px] rounded-[8px] font-bold">SEND</button>
              </div>
            </div>

            <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="block w-full" :class="replyIndex !== comment.replies.length - 1 ? 'mb-5' : ''">
              <div class="flex justify-between w-full p-4 bg-white rounded-[10px]">
                <div class="flex-none content-center w-[40px] h-[100px] bg-v-light-gray p-2 rounded-[10px] hidden md:block">
                  <div class="flex flex-col justify-between items-center h-full h-full py-1">
                    <img @click="upVote(comment.id, reply.id)" src="/icon-plus.svg" alt="Upvote" role="button">
                    <span class="font-bold moderate-blue"> 
                      {{ reply.score }}
                    </span>
                    <img @click="downVote(comment.id, reply.id)" src="/icon-minus.svg" alt="Downvote" role="button"> 
                  </div>
                </div>
                
                <!-- Post new reply to comment -->
                <div class="pl-0 md:pl-5 pr-3 w-full">
                  <div class="flex w-full justify-between">
                    <div>
                      <img :src="reply.user.image.png" :alt="reply.user.username + 'Avatar'" class="inline h-[32px]">
                      <span class="dark-blue font-bold pl-4 pr-1">
                        {{ reply.user.username }} 
                      </span>
                      <!-- Reply was made by currUser -->
                      <span v-if="store.data.currentUser.username == reply.user.username" class="b-moderate-blue text-white text-xs p-0.5 px-1 pb-1 rounded mx-1">
                        you
                      </span>
                      <span class="pl-1 grey-blue">
                        {{ reply.createdAt }}
                      </span>
                    </div>
                    <div v-if="store.data.currentUser.username !== reply.user.username" role="button" class="group hidden md:block">
                      <svg width="14" height="13"  class="fill-[#5357B6] group-hover:fill-[#C5C6EF] mb-1 mr-1 inline" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                      </svg>
                      <span @click="reply.showReply = !reply.showReply" class="text-[#5357B6] font-bold group-hover:text-[#C5C6EF]" role="button">
                        Reply
                      </span>
                    </div>
                    
                    <!-- Reply was made by currUser -->
                    <div v-else role="button" class="hidden md:block">
                      <button @click="this.deleteID = reply.id; toggleModal()" class="inline" role="button">
                        <img src="/icon-delete.svg" alt="Reply" class="inline pr-2 pb-1">
                        <span class="font-bold mr-4 text-[#ED6368]">
                          Delete
                        </span>
                      </button>
                      <img src="/icon-edit.svg" alt="Reply" class="inline pr-1 pb-1">
                      <span @click="reply.showEdit = !reply.showEdit" class="moderate-blue font-bold">
                        Edit
                      </span>
                    </div>
                  </div>
                  <div v-if="store.data.currentUser.username == reply.user.username && reply.showEdit" class="mt-4 grey-blue">
                    <textarea v-model="reply.content" class="px-4 py-3 mr-3 w-full min-h-[100px] border resize-none rounded-[8px]"></textarea>
                    <div class="block">
                      <button @click="editComment(reply, reply.content)" class="mt-2 float-right text-white b-moderate-blue h-[48px] w-[104px] rounded-[8px] font-bold">UPDATE</button>
                    </div>
                  </div>
                  <div v-else class="mt-4 grey-blue">
                    <span class="font-bold moderate-blue">@{{ reply.replyingTo }}</span> {{ reply.content }}
                  </div>

                  <!-- Mobile Options -->
                  <div class="flex w-full justify-between md:hidden">
                    <div class="flex-none justify-between w-[100px] h-[40px] bg-v-light-gray mt-4 p-2 rounded-[10px] md:hidden">
                      <div class="flex justify-between items-center h-full h-full py-1">
                        <img @click="upVote(comment.id, reply.id)" src="/icon-plus.svg" alt="Upvote" role="button">
                        <span class="font-bold moderate-blue"> 
                          {{ reply.score }}
                        </span>
                        <img src="/icon-minus.svg" alt="Downvote" role="button"> 
                      </div>
                    </div>
                    <div v-if="store.data.currentUser.username !== reply.user.username" role="button" class="group mt-6 md:hidden">
                      <svg width="14" height="13"  class="fill-[#5357B6] group-hover:fill-[#C5C6EF] mb-1 mr-1 inline" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                      </svg>
                      <span @click="reply.showReply = !reply.showReply" class="text-[#5357B6] font-bold group-hover:text-[#C5C6EF]" role="button">
                        Reply
                      </span>
                    </div>

                    <!-- Reply was made by currUser -->
                    <div v-else role="button" class="mt-6 md:hidden">
                      <div class="inline" role="button" data-modal-toggle="defaultModal">
                        <img src="/icon-delete.svg" alt="Reply" class="inline pr-1 pb-1">
                        <span class="font-bold mr-4 text-[#ED6368]">
                          Delete
                        </span>
                      </div>
                      <div class="group inline">
                        <svg width="14" height="13"  class="fill-[#5357B6] group-hover:fill-[#C5C6EF] mb-1 mr-1 inline" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                        </svg>
                        <span @click="reply.showEdit = !reply.showEdit" class="text-[#5357B6] font-bold group-hover:text-[#C5C6EF]" role="button">
                          Edit
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- <div v-if="store.data.currentUser.username == reply.user.username && reply.showEdit" class="mt-4 grey-blue">
                    <textarea v-model="reply.content" class="px-4 py-3 mr-3 w-full min-h-[100px] border resize-none rounded-[8px]"></textarea>
                    <button @click="editComment(reply, reply.content)" class="mt-2 float-right text-white b-moderate-blue h-[48px] w-[104px] rounded-[8px] font-bold">UPDATE</button>
                  </div>
                  <div v-else class="mt-4 grey-blue">
                    <span class="font-bold moderate-blue">@{{ reply.replyingTo }}</span> {{ reply.content }}
                  </div> -->

                </div>
              </div>

              <!-- Add comment to reply -->
              <div v-if="reply.showReply" class="bg-white w-full pr-3 py-5 mt-5 rounded-[8px] justify-between hidden md:flex">
                <div class="px-4 min-h-full">
                  <div class="w-[40px] h-full">
                    <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                  </div>
                </div>
                <textarea v-model="comment.reply" placeholder="Add comment..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
                <button @click="addReply(comment, reply.user.username)" class="text-white px-3 b-moderate-blue h-[48px] mr-4 min-w-[104px] rounded-[8px] font-bold">SEND</button>
              </div>

              <!-- Mobile View -->
              <div v-if="reply.showReply" class="bg-white w-full pr-5 py-5 mt-5 rounded-[8px] justify-between flex md:hidden">
                <div class="px-4 min-h-full">
                  <div class="w-[40px] h-full">
                    <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                  </div>
                </div>
                <textarea placeholder="Add comment..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"  :value="'@' + reply.user.username + ' '"></textarea>
                <button class="text-white px-3 mr-3 b-moderate-blue h-[48px] min-w-[104px] rounded-[8px] font-bold">SEND</button>
              </div>

              
            </div>

            <!-- <div v-if="comment.showReply" class="bg-white w-full p-3 py-5 mb-5 rounded-[8px] md:hidden">
              <textarea v-model="comment.reply" placeholder="Add reply..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
              <div class="flex justify-between mt-3">
                <div class="min-h-full">
                  <div class="w-[40px] h-full">
                    <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                  </div>
                </div>
                <button @click="addReply(comment)" class="text-white px-3 b-moderate-blue h-[48px] w-[104px] rounded-[8px] font-bold">REPLY</button>
              </div>
            </div> -->

            
          </div>

          
        </div>

        <!-- Add Reply -->
        <div v-if="!comment.replies.length">
          <div v-if="comment.showReply" class="bg-white w-full p-3 py-5 mb-5 rounded-[8px] flex justify-between hidden md:flex">
            <div class="px-4 min-h-full">
              <div class="w-[40px] h-full">
                <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
              </div>
            </div>
            <textarea v-model="comment.reply" placeholder="Add reply..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]">
            </textarea>
            <button @click="addReply(comment)" class="mr-3 text-white px-3 b-moderate-blue h-[48px] min-w-[104px] rounded-[8px] font-bold">REPLY</button>
          </div>

          <!-- <div v-if="comment.showReply" class="bg-white w-full p-3 py-5 mb-5 rounded-[8px] md:hidden">
            <textarea v-model="comment.reply" placeholder="Add reply..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
            <div class="flex justify-between mt-3">
              <div class="min-h-full">
                <div class="w-[40px] h-full">
                  <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                </div>
              </div>
              <button @click="addReply(comment)" class="text-white px-3 b-moderate-blue h-[48px] w-[104px] rounded-[8px] font-bold">REPLY</button>
            </div>
          </div> -->

          <div v-if="comment.showReply" class="bg-white w-full p-3 py-5 mb-5 rounded-[8px] md:hidden">
            <textarea placeholder="Add comment..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
            <div class="flex justify-between mt-3">
              <div class="min-h-full">
                <div class="w-[40px] h-full">
                  <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
                </div>
              </div>
              <button class="text-white px-3 mr-3 b-moderate-blue h-[48px] min-w-[104px] rounded-[8px] font-bold">SEND</button>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Top Level Add Comment -->
      <div class="bg-white w-full p-3 py-5 pr-5 rounded-[8px] justify-between hidden md:flex">
        <div class="px-4 min-h-full">
          <div class="w-[40px] h-full">
            <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
          </div>
        </div>
        <textarea placeholder="Add comment..." v-model="newComment" class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
        <button @click="addComment(newComment)" class="mr-2 text-white px-3 b-moderate-blue h-[48px] min-w-[104px] rounded-[8px] font-bold">SEND</button>
      </div>

      <!-- Top Level Add Comment // Mobile Options -->
      <div class="bg-white w-full p-3 py-5 rounded-[8px] md:hidden">
        <textarea v-model="newComment" placeholder="Add comment..." class="px-4 py-3 mr-3 w-full min-h-[80px] border resize-none rounded-[8px]"></textarea>
        <div class="flex justify-between mt-3">
          <div class="min-h-full">
            <div class="w-[40px] h-full">
              <img :src="store.data.currentUser.image.png"  :alt="store.data.currentUser.username + 'Avatar'" class="inline h-[40px]">
            </div>
          </div>
          <button @click="addComment(newComment)" class="text-white px-3 mr-3 b-moderate-blue h-[48px] min-w-[104px] rounded-[8px] font-bold">SEND</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useStore } from '~/stores/store'


export default defineComponent({
  setup() {
    const store = useStore()

    store.data.comments = store.data.comments.map((comment) => {
      comment.showReply = false
      comment.showEdit = false
      comment.reply = ''

      comment.replies = comment.replies.map((reply) => {
        reply.showReply = false 
        reply.showEdit = false
        reply.reply = ''

        return reply
      })

      return comment
    })

    return { store }
  },
  data: function () {
    return {
      newComment: '',
      deleteID: '',
    }
  },
  computed: {
    modal () {
      return new Modal(document.getElementById('defaultModal'))
    }
  },
  methods: {
    editReply (commentID, data) {
      // ...
    },
    editComment (comment, data) {
      for (let i = 0; i < this.store.data.comments.length; i++) {
        if (this.store.data.comments[i].id === comment.id) {
          comment.showEdit = false
          this.store.data.comments[i].content = data;
          break;
        }
        
        if (this.store.data.comments[i].replies) {
          for (let t = 0; t < this.store.data.comments[i].replies.length; t++) {
            if (this.store.data.comments[i].replies[t].id === comment.id) {
              comment.showEdit = false
              this.store.data.comments[i].replies[t].content = data;
              break;
            }
          }
        }
      }
    },
    addComment (data) {
      if (data !== '') {
        this.store.data.comments.push({
          "id": this.makeid(),
          "content": this.newComment,
          "createdAt": "Just now",
          "score": 0,
          "user": this.store.data.currentUser,
          "replies": []
        })

        this.newComment = ''
      }
    },
    addReply (comment, replyingTo) {
      this.store.data.comments.find((x) => x.id == comment.id).replies.push({
        "id": this.makeid(),
        "content": comment.reply,
        "createdAt": "Just now",
        "score": 0,
        "replyingTo": replyingTo ? replyingTo : comment.user.username,
        "user": this.store.data.currentUser
      })

      console.log()

      comment.reply = ''
      this.closeAllTabs()
    },
    deleteComment () {
      this.store.data.comments = this.store.data.comments.filter((comment) => {
        comment.replies = comment.replies.filter((reply) => {
          return reply.id !== this.deleteID
        })

        return comment.id !== this.deleteID
      })
      
      this.deleteID = ''
      this.modal.toggle()
    },
    handleCommentReply (commentID) {
      alert('Make reply: ' + commentID)
    },
    upVote (commentID, replyID) {
      commentID && !replyID ? this.store.data.comments.find((x) => x.id == commentID).score++ : ''
      commentID && replyID ? this.store.data.comments.find((x) => x.id == commentID).replies.find((y) => y.id == replyID).score++ : ''
    },
    downVote (commentID, replyID) {
      commentID && !replyID ? this.store.data.comments.find((x) => x.id == commentID).score-- : ''
      commentID && replyID ? this.store.data.comments.find((x) => x.id == commentID).replies.find((y) => y.id == replyID).score-- : ''
    },

    closeAllTabs () {
      console.log('ooga booga')
      this.store.data.comments = this.store.data.comments.map((comment) => {
        comment.showReply = false
        comment.replies = comment.replies.map((reply) => {
          reply.showReply = false
          return reply
        })

        return comment
      })
    },
    toggleModal () {
      // let targetEl = document.getElementById('defaultModal');
      // targetEl.toggle()
      // let modal = new Modal(document.getElementById('defaultModal'));
      // modal.toggle()
      // console.log(targetEl)
      this.modal.toggle()
    },
    makeid () {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var numbers = '0123456789'

      for ( var i = 0; i < 2; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      for ( var i = 0; i < 4; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }

      return result;
    }
  }
})
</script>

<style scoped>
.bg-v-light-gray {
  background-color: #F5F6FA;
}

.b-light-gray {
  border-color: #E9EBF0;
}

.grey-blue {
  color: #67727E;
}

.dark-blue {
  color: #334253;
}

.moderate-blue {
  color: #5357B6;
}

.b-moderate-blue {
  background-color: #5357B6;
}
</style>