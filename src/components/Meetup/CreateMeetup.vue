<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h4 class="primary--text">Create a new Meetup</h4>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">
					<!-- Title field -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="title"
								label="Title"
								id="title"
								v-model="title"
								required>
							</v-text-field>
						</v-flex>
					</v-layout>
					<!-- Location field -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="location"
								label="Location"
								id="location"
								v-model="location"
								required>
							</v-text-field>
						</v-flex>
					</v-layout>
					<!-- Image URL -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="imgUrl"
								label="Image URL"
								id="img-url"
								v-model="imgUrl"
								required>
							</v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imgUrl" style="height: 300px;">
						</v-flex>
					</v-layout>
					<!-- Description field -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="description"
								label="Description"
								multi-line
								id="description"
								v-model="description"
								required>
							</v-text-field>
						</v-flex>
					</v-layout>
					<!-- Date and time picker -->
					<v-layout row class="mb-3">
						<v-flex xs12 sm6 offset-sm3>
							<h5>Choose a date</h5>
							<v-date-picker v-model="date"></v-date-picker>
						</v-flex>
					</v-layout>
					<v-layout row class="mb-3">
						<v-flex xs12 sm6 offset-sm3>
							<h5>Choose time</h5>
							<v-time-picker v-model="time" format="24hr"></v-time-picker>
						</v-flex>
					</v-layout>
					<!-- Submit button -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn class="primary" 
							:disabled="!formIsValid"
							type="submit">Create Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	/* eslint-disable */
	export default {
		data () {
			return{
				title: '',
				location: '',
				imgUrl: '',
				description: '',
				date: new Date(),
				time: new Date()
			}
		},
		computed: {
			formIsValid () {
				return this.title !== '' && 
				this.location !== '' && 
				this.imgUrl !== '' && 
				this. description !== ''
			},
			submittableDateTime () {
				const date = new Date(this.date)
				if (typeof this.time === "string") {
					const hours = this.time.match(/^(\d+)/)[1]
					const minutes = this.time.match(/:(\d+)/)[1]
					date.setHours(hours)
					date.setMinutes(minutes)
				} else {
					date.setHours(this.time.getHours())
					date.setMinutes(this.time.getMinutes())
				}	
				return date
			}
		},
		methods: {
			onCreateMeetup () {
				if (!this.formIsValid){
					return
				}
				const meetupData = {
					title: this.title,
					location: this.location,
					imgUrl: this.imgUrl,
					description: this.description,
					date: this.submittableDateTime
				}
				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/meetups')
			}
		}
	}
</script>
