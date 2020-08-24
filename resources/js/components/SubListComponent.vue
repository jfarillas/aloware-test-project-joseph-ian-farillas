<template>
  <section slot="replies">
    <div v-for="(val, index) in replies"
    :key="val.id"
    slot="comments"
    :class="{ 'pt-3': index === 0 }"
    class="d-flex align-items-start flex-column mb-3 pl-3">
      <div class="block__section--name">
        {{ val.name }}
      </div>
      <div class="block__section--comment-text mb-1">
        {{ val.comment }}
      </div>
      <!-- PUT "REPLY" LINK ONLY IF THE CURRENT REPLY IS NOT YET AT THE 3RD LEVEL -->
      <a v-if="typeof val.replies !== 'undefined'"
      href="javascript:void(0)" 
      @click="createReply(val.id)"
      class="block__section--reply">Reply</a>
      <!-- END PUT "REPLY" LINK ONLY IF THE CURRENT REPLY IS NOT YET AT THE 3RD LEVEL -->
      <!-- SUB REPLY SECTION -->
      <sub-list :replies="val.replies">
        <slot name="replies"></slot>
      </sub-list>
      <!-- END SUB REPLY SECTION -->
      <comment v-if="currentId === val.id && showReplyForm" 
      :id="currentId"
      :parent-index="index"
      @addReply="addReplyList">
        <slot name="add"></slot>
      </comment>
    </div>
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
      replies: {
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
          // Remove empty "replies" key element if its already at 3rd level
          const { ['replies']: [], ...result } = res[0];

          this.replies[this.$store.getters.parentIndex].replies.push(result);
          console.log(this.replies[this.$store.getters.parentIndex].replies);
        });
      }
    },

    mounted() {
      console.log('Component mounted.');
    }
  }
</script>
