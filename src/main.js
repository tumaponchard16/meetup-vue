import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/alert'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
  		apiKey: 'AIzaSyAxzgWBrfrVQOh8ZpiakZIE0gEzmYgASns',
	    authDomain: 'meetups-bab44.firebaseapp.com',
	    databaseURL: 'https://meetups-bab44.firebaseio.com',
	    projectId: 'meetups-bab44',
	    storageBucket: 'meetups-bab44.appspot.com'
  	})
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    // fetch all meetups from firebase
    this.$store.dispatch('loadedMeetups')
  }
})
