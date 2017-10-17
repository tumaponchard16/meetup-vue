/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups:[
			{	
				imgUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,f_auto,g_center,h_360,q_auto:good,w_1140/v1/softlayer0/80135C1/media/v1/AUTH_d0619b05-07fc-49f0-8249-da585ea45ce5/chapter_banners/new_york_city_united_states_of_america_kftdPmP.jpg', 
				id: 'fadshst5676gafda', 
				title: 'Meetup in Kapatagan',
				date: new Date(),
				location: 'Kapatagan',
				description: 'Some dummy data description from Kapatagan meetup'
			},
			{	
				imgUrl: 'http://www.parisaddress.com/var/source/district/new/tour_eiffel-paris.jpg', 
				id: 'gshfagasdf76547thgfsdhs',
				title: 'Meetup in Maranding',
				date: new Date(),
				location: 'Maranding',
				description: 'Some dummy data description from Maranding meetup'
			}
		],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setLoadedMeetups (state, payload) {
			state.loadedMeetups = payload
		},
		createMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		},
		setUser (state, payload) {
			state.user = payload
		},
		setLoading (state, payload) {
			state.loading = payload
		},
		setError (state, payload) {
			state.error = payload
		},
		clearError (state, payload) {
			state.error = null
		}
	},
	actions: {
		// Fetch all the data from firebase
		loadedMeetups ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('meetups').once('value')
			.then((data) => {
				const meetups = []
				const obj = data.val()
				for (let key in obj) {
					meetups.push({
						id: key,
						title: obj[key].title,
						description: obj[key].description,
						imgUrl: obj[key].imgUrl,
						location: obj[key].location,
						date: obj[key].date,
						creatorId: obj[key].creatorId
					})
				}
				commit('setLoadedMeetups', meetups)
				commit('setLoading', false)
			})
			.catch(
				(error) => {
					console.log(error)
					commit('setLoading', true)
				}
			)
		},
		createMeetup ({commit, getters}, payload){
			const meetup = {
				title: payload.title,
				location: payload.location,
				imgUrl: payload.imgUrl,
				description: payload.description,
				date: payload.date.toISOString(),
				creatorId: getters.user.id
			}
			//Reach out to firebase and save it
			firebase.database().ref('meetups').push(meetup)
			.then((data) => {
				const key = data.key
				commit('createMeetup', {
					...meetup,
					id: key
				})
			})
			.catch((error) => {
				console.log(error)
			})
		},
		signUserUp ({commit}, payload) {
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then(
				user => {
					commit('setLoading', false)
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					}
					commit('setUser', newUser)
				}
			)
			.catch(
				error => {
					commit('setLoading', false)
					commit('setError', error)
					console.log(error)
				}
			)
		},
		signUserIn ({commit}, payload )	{
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(
				user => {
					commit('setLoading', false)
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					}
					commit('setUser', newUser)
				}
			)
			.catch(
				error => {
					commit('setLoading', false)
					commit('setError', error)
					console.log(error)
				}
			)
		},
		autoSignIn ({commit}, payload){
			commit('setUser', {id: payload.uid, registeredMeetups: []})
		},
		logout ({commit}){
			firebase.auth().signOut()
			commit('setUser', null)
		},
		clearError ({commit}) {
			commit('clearError')
		}
	},
	getters: {
		loadedMeetups(state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupB.date > meetupB.date
			})
		},
		featuredMeetups(state, getters) {
			return getters.loadedMeetups.slice(0, 5)
		},
		loadedMeetup (state) {
			return (meetupId) => {
				return state.loadedMeetups.find((meetup) => {
					return meetup.id === meetupId
				})
			}
		},
		user (state) {
			return state.user
		},
		loading (state) {
			return state.loading
		},
		error (state) {
			return state.error
		}
	}
})
