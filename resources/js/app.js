/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import store from './store/index';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import dataMixin from './mixins/dataMixin';
import sanitizeMixin from './mixins/sanitizeMixin';

//Mixins
Vue.mixin(dataMixin);
Vue.mixin(sanitizeMixin);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('post', require('./components/PostComponent.vue').default);
Vue.component('list', require('./components/ListComponent.vue').default);
Vue.component('sub-list', require('./components/SubListComponent.vue').default);
Vue.component('comment', require('./components/CommentComponent.vue').default);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueMoment, {
  moment
});

// Add Fontawesome icons
library.add([
  faSpinner
]);

// Register a global custom directive called `v-focus`
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
  store,
  el: '#app',
});
