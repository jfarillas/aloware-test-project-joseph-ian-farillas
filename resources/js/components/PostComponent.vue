<template>
  <div class="container block">
    <div class="row justify-content-center block__div">
      <div class="col-md-8">
        <div class="card block__div--post">
          <div class="card-header">
            <h2>featured post</h2>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="mb-3">
                60% of advertising and marketing hiring decision-makers say they plan to add new positions to their teams in the first half of 2019. Here's why it's a great time to look for a creative job: <a href="http://ow.ly/de9P30nfPmM" target="_blank">http://ow.ly/de9P30nfPmM</a>
              </div>
              <a href="javascript:void(0)" @click="createComment">Leave a comment</a>
            </div>
            <list :fetched-data="data">
              <slot name="comments"></slot>
            </list>
            <comment v-if="showCommentForm" 
            :id="null"
            @addComment="addCommentList">
              <slot name="add"></slot>
            </comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    data: () => ({
      data: null,
      showCommentForm: false,
    }),

    methods: {
      createComment: function(e) {
        e.preventDefault();
        this.showCommentForm = true;
      },

      addCommentList: function(obj) {
        obj.then(res => {
          this.data[0].push(res[0]);
          console.log(this.data);
        });
      }
    },

    created() {
      // Get All comments and its replies
      console.log(this.fetchAll('commentList', this));
      this.data = this.fetchAll('commentList', this);
    },

    mounted() {
      console.log('Component mounted.');
    }
  }
</script>
