<template> 
	<v-container>
		<!--Two large button-->
		<v-layout row wrap class="mb-3">
			<v-flex xs-12 sm6 class="text-xs-center text-sm-right">
				<v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
			</v-flex>
			<v-flex xs-12 sm6 class="text-xs-center text-sm-left">
				<v-btn large router to="/meetup/new" class="info">Organize Meetups</v-btn>
			</v-flex>
		</v-layout>
		<!-- Loader activity-->
		<v-layout>
			<v-flex xs12 class="text-xs-center">
				<v-progress-circular 
				 indeterminate 
				 color="red"
				 :width="7"
				 :size="70"
				 v-if="loading"></v-progress-circular>
			</v-flex>
		</v-layout>
		<!--Carousel-->
		<v-layout row wrap class="mt-3" v-if="!loading">
			<v-flex xs-12>
				<v-carousel style="cursor: pointer;">
		    		<v-carousel-item 
		    			v-for="meetup in meetups" 
		    			:src="meetup.imgUrl" 
		    			:key="meetup.id"
		    			@click="onLoadMeetup(meetup.id)">
			    			<div class="title">
			    				{{ meetup.title }}
			    			</div>
		    			</v-carousel-item>
		  		</v-carousel>
			</v-flex>
		</v-layout>
		<!--fasdfas-->
		<v-layout row wrap class="mt-3">
			<v-flex xs-12 class="text-xs-center">
				<h4>Join our awesome meetups!</h4>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	/* eslint-disable */
	export default{
		// data () {
		// 	return {
		// 		meetups: [
		// 			{imgUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,f_auto,g_center,h_360,q_auto:good,w_1140/v1/softlayer0/80135C1/media/v1/AUTH_d0619b05-07fc-49f0-8249-da585ea45ce5/chapter_banners/new_york_city_united_states_of_america_kftdPmP.jpg', id: 'fadshst5676gafda', title: 'Meetup in Kapatagan'},
		// 			{imgUrl: 'http://www.parisaddress.com/var/source/district/new/tour_eiffel-paris.jpg', id: 'gshfagasdf76547thgfsdhs', title: 'Meetup in Maranding'}
		// 		]
		// 	}
		// },
		computed: {
			meetups () {
				return this.$store.getters.featuredMeetups
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		methods: {
			onLoadMeetup (id){
				this.$router.push('/meetups/' + id)
			}
		}
	}
</script>

<style scoped>
	.title{
		position: absolute;
		bottom: 50px;
		background-color: rgba(0,0,0,0.5);
		color: white;
		font-size: 20px !important;
		padding: 25px;
	}
</style>
