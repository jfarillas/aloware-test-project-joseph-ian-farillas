import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { APIService } from '../services/APIService';

const apiService = new APIService();
const defaultState = () => {
  return [];
};

Vue.use(Vuex);

function getCommentReply(context, response, mutation) {
  let data = response.data || response;
  console.log('----Comments/Replies Action for added data----');
  console.log(data);
  context.commit(mutation, data);
  return data;
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  
  state: {
    commentList: [],
    commentNew: null,
    replyNew: null,
    parentIndex: null
  },
  
  mutations: {
    commentList(state, payload) {
      console.log('----Comments Mutation for all data----');
      console.log(payload);
      state.commentList = payload;
    },

    commentNew(state, payload) {
      console.log('----Comments Mutation for added data----');
      console.log(payload);
      state.commentNew = payload;
    },

    replyNew(state, payload) {
      console.log('----Replies Mutation for added data----');
      console.log(payload);
      state.replyNew = payload;
    },

    parentIndex(state, payload) {
      console.log('----Parent Index Mutation for added data----');
      console.log(payload);
      state.parentIndex = payload;
    },
  },

  actions: {
    commentList (context, payload) {
      return new Promise((resolve, reject) => {
        const id = null;
        apiService.getData('comments', id).then((res) => {
          let data = res.data || res;
          console.log('----Comments Action for all data----');
          console.log(data);
          context.commit('commentList', data);
          resolve(data);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    },

    commentReplyStore (context, payload) {
      return new Promise((resolve, reject) => {
        // If the comment has no parent ID yet
        // Get newly added comment. Otherwise, get newly added reply for a specific comment
        if (typeof payload.parentId === 'undefined') {
          apiService.getData('comment', payload).then((res) => {
            resolve(getCommentReply(context, res, 'commentNew'));
          }).catch((err) => {
            reject(err);
          });
          
        } else {
          apiService.getData('comment', payload.id).then((res) => {
            resolve(getCommentReply(context, res, 'replyNew'));
          }).catch((err) => {
            reject(err);
          });
        }
      });
    }
  },

  getters: {
    parentIndex: state => {
      return state.parentIndex;
    },
  }

})
