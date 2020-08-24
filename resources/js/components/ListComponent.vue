<template>
  <section class="block__section">
    <div class="block__section--comments mb-2">
      <h3>comments</h3>
    </div>
    <!-- COMMENTS SECTION -->
    <div v-for="(value, parentIndex) in fetchedData[0]"
    :key="value.id"
    slot="comments"
    class="d-flex align-items-start flex-column mb-3">
      <div class="block__section--name">
        {{ value.name }}
      </div>
      <div class="block__section--comment-text mb-1">
        {{ value.comment }}
      </div>
      <a href="javascript:void(0)" 
      @click="createReply(value.id)"
      class="block__section--reply">Reply</a>
      <!-- REPLY SECTION -->
      <sub-list :replies="value.replies">
        <slot name="replies"></slot>
      </sub-list>
      <!-- END REPLY SECTION -->
      <comment v-if="currentId === value.id && showReplyForm" 
      :id="currentId"
      :parent-index="parentIndex"
      @addReply="addReplyList">
        <slot name="add"></slot>
      </comment>
    </div>
    <!-- END COMMENTS SECTION -->
  </section>
</template>

<script>

  export default {

    data: () => ({
      data: null,
      currentId: null,
      showReplyForm: false
    }),

    props: {
      fetchedData: {
        type: Array
      }
    },

    methods: {
      createReply: function(id) {
        this.currentId = id; 
        this.showReplyForm = true;
      },

      addReplyList: function(obj) {
        obj.then(res => {
          this.fetchedData[0][this.$store.getters.parentIndex].replies.push(res[0]);
          console.log(this.fetchedData);
        });
      }
    },

    mounted() {
      console.log('Component mounted.');
    }
  }
</script>
