/**
 * Data Mixin
 * CRUD for data manipulation
 * authored by: Joseph Ian Farillas
 */
export default {
  methods: {
    fetchAll: function(STORE_ACTION, obj) {
      let result = [];
      obj.$store.dispatch(STORE_ACTION).then(res => {
        console.log(res);
        result.push(res);
      });
      return result;
    },
  }
};