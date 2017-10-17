<template>
	<v-container>
		<!-- Error -->
		<v-layout v-if="error">
			<v-flex xs12 md6 offset-md3>
				<app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
			</v-flex>
		</v-layout>
		<!-- Sign in form -->
		<v-layout row>
			<v-flex xs12 md6 offset-md3>
				<v-card>
					<v-container>
						<form @submit.prevent="onSignin">
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
							<!-- Sign in button -->
							<v-layout row>
								<v-flex xs12>
									<v-btn type="submit" :disabled="loading" :loading="loading">
										Sign in
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
				password: ''
			}
		},
		computed: {
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
			//Redirect user to homepage after succesful signin 
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSignin () {
				this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
			},
			onDismissed () {
				this.$store.dispatch('clearError')
			}
		}
	}
</script>
