<template>
  <form slot="add" class="block__form mt-3">
    <div class="form-group row">
      <label for="type" class="col-md-4 col-form-label text-md-right">Name</label>
      <div class="col-md-6">
        <input id="type" 
        type="text" 
        v-model="name"
        class="form-control" 
        name="name" 
        required 
        autocomplete="name" 
        autofocus>
        <span v-if="nameError" 
        class="error" 
        :aria-errormessage="nameError">
        {{ nameError }}
        </span>
      </div>
    </div>
    <div class="form-group row">
      <label for="name" class="col-md-4 col-form-label text-md-right">Comment</label>
      <div class="col-md-6">
        <textarea id="comment"
        v-model="comment"
        class="form-control" 
        name="comment" 
        required 
        autocomplete="comment"></textarea>
        <span v-if="commentError" 
        class="error" 
        :aria-errormessage="commentError">
        {{ commentError }}
        </span>
      </div>
    </div>
    <div class="form-group row mb-0">
      <div class="col-md-6 offset-md-4">
      <button v-if="disabled !== 'disabled'"
      type="submit" 
      @click="storeComment"
      class="btn btn-primary">add {{ btnText }}</button>

      <button v-else
      type="submit"
      disabled 
      class="btn btn-primary">
        <font-awesome-icon 
        icon="spinner" 
        size="1x" 
        spin fixed-width>
        </font-awesome-icon> Adding...
      </button>
      </div>
    </div>
  </form>
</template>

<script>

  import { APIService } from '../services/APIService';

  const apiService = new APIService();

  export default {

    data: () => ({
      name: null,
      comment: null,
      btnText: null,
      nameError: null,
      commentError: null,
      disabled: null
    }),

    props: {
      id: {
        type: Number
      },
      parentIndex: {
        type: Number
      }
    },

    methods: {
      storeComment: function(e) {
        e.preventDefault();
        // Disable the button
        this.disabled = 'disabled';

        // Consume an API endpoint with a payload based on the following rules:
        // Comment = no comment ID yet
        // Reply = has comment ID to reply to
        let payload = (!this.id) 
          ? {
            name: this.sanitize(this.name),
            comment: this.sanitize(this.comment)
          }
          : {
            parent_id: this.id,
            name: this.sanitize(this.name),
            comment: this.sanitize(this.comment)
          };

        apiService.addData('comment', payload).then((res) => {

          if (typeof res.data.message.error === 'undefined') {
            console.log(res.data.message);

            // Validation errors
            this.nameError = null;
            this.commentError = null;

            // Reload the comments/replies based on the following rules:
            // Comment = no comment ID yet
            // Reply = has comment ID to reply to
            console.log(`added ID :: ${res.data.id}`);
            console.log(`Parent Index :: ${this.parentIndex}`);
            let addNewData = (!this.id) ? 'addComment' : 'addReply';
            let dataIds = (!this.id) 
              ? res.data.id 
              : { 
                  id: res.data.id,
                  parentId: this.id
                };

            // Update the parent index in VUEX
            this.$store.commit('parentIndex', this.parentIndex);
            // Dispatch the current payload for API call side effect in VUEX 
            this.$emit(addNewData, this.$store.dispatch('commentReplyStore', dataIds));

            // Clear form values
            this.name = null;
            this.comment = null;

            // Enable the button
            this.disabled = '';

          } else {
            console.log(res.data.message.error);
            // Validation errors
            this.nameError = (!this.name || res.data.message.error.name) ? res.data.message.error.name[0] : null;
            this.commentError = (!this.comment || res.data.message.error.comment) ? res.data.message.error.comment[0] : null;
            
            // Enable the button
            this.disabled = '';
          }
        }).catch((err) => {
          // Enable the button
          this.disabled = '';
        });

      }
    },
  
    

    mounted() {
      console.log('Component mounted.')

      // Button text based on the following rules:
      // Comment = no comment ID yet
      // Reply = has comment ID to reply to
      this.btnText = (!this.id) ? 'comment' : 'reply';
    }
  }
</script>
