<template>
	<v-container>
		<v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
			<v-flex xs12 sm10 md8 offset-sm1 offset-md2>
				<v-card class="light">
					<v-container fluid>
						<v-layout row>
							<v-flex xs5 sm4 md3>
								<v-card-media :src="meetup.imgUrl"
								height="130px"></v-card-media>
							</v-flex>
							<v-flex xs7 sm8 md9>
								<v-card-title primary-title>
									<div>
						                <div class="headline">{{ meetup.title }}</div>
						                <div>{{ meetup.date | date }}</div>
						            </div>
					            </v-card-title>
					            <v-card-actions>
					            	<v-btn class="primary" :to=" '/meetups/' + meetup.id">
					            		<v-icon left light class="white--text">arrow_forward</v-icon>
					            		View Meetup
					            	</v-btn>
					            </v-card-actions>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	/* eslint-disable */
	export default {
		computed: {
			meetups () {
				return this.$store.getters.loadedMeetups
			}
		}
	}
</script>
