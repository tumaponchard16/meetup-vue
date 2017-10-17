<template>
	<v-container>
		<!-- Error -->
		<v-layout v-if="error">
			<v-flex xs12 md6 offset-md3>
				<app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
			</v-flex>
		</v-layout>
		<!-- Show error if password do not match -->
		<v-layout row>
			<v-flex xs12 md6 offset-md3>
				<v-alert error icon="warning" dismissible @dismissed="onDismissed" v-model="alert">
			      	Password do not match
			    </v-alert>
			</v-flex>
		</v-layout>
		<!-- sign up form -->
		<v-layout row>
			<v-flex xs12 md6 offset-md3>
				<v-card>
					<v-container>
						<form @submit.prevent="onSignup">
							<!-- Email field -->
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="email"
									label="Email"
									id="email"
									v-model="email"
									type="email"
									required></v-text-field>
								</v-flex>
							</v-layout>
							<!-- Password field -->
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="password"
									label="Password"
									id="password"
									v-model="password"
									type="password"
									required></v-text-field>
								</v-flex>
							</v-layout>
							<!-- Confirm Password -->
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="confirmPassword"
									label="Confirm Password"
									id="confirmPassword"
									v-model="confirmPassword"
									type="password"
									required
									:rules="[comparePasswords]"></v-text-field>
								</v-flex>
							</v-layout>
							<!-- Submit button -->
							<v-layout row>
								<v-flex xs12>
									<v-btn type="submit" :disabled="loading" :loading="loading">
										Sign up
										<span slot="loader" class="custom-loader">
									        <v-icon light>cached</v-icon>
									    </span>					
									</v-btn>
								</v-flex>
							</v-layout>
						</form>
					</v-container>
				</v-card>
			</v-flex><!-- / xs12 sm6 offset-sm3-->
		</v-layout>
	</v-container>
</template>

<script>
	/* eslint-disable */
	export default {
		data () {
			return {
				email: '',
				password: '',
				confirmPassword: '',
				alert: false
			}
		},
		computed: {
			// Check to see if password and confirm password matched
			comparePasswords () {
				return this.password !== this.confirmPassword ? 'Password do not match' : ''
			},
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		watch: {
			//Redirect user to homepage after succesful signup 
			user (value) {
				if (value !== null && value !== undefined){
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSignup () {
				// check if password matched
				if (this.password !== this.confirmPassword){
					console.log('password do not match')
					return this.alert = true
				} else {
				// Assigning object and pass it to store	
					this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
				}
			},
			onDismissed () {
				console.log('Dismissed Alert!')
				this.$store.dispatch('clearError')
			}
		}
	}
</script>
