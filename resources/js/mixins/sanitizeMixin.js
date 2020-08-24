/**
 * Sanitize Mixin
 * Filter out malicious text that could result in a security vulnerability
 * authored by: Joseph Ian Farillas
 */
export default {
  methods: {
    sanitize: function(value) {
      const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          "/": '&#x2F;',
          '`': '&grave;'
      };
      const reg = /[&<>"'/]/ig;
      return value.replace(reg, (match)=>(map[match]));
    },
  }
};