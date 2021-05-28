<template>
	<layout
		><div class="auth-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Sign up</h1>
						<p class="text-xs-center">
							<router-link :to="{ name: 'login' }">Have an account</router-link>
						</p>

						<ul v-if="errors.length > 0" class="error-messages">
							<li :key="error" v-for="error in errors">{{ error }}</li>
						</ul>

						<form @submit.prevent="handleRegister">
							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="text" placeholder="Your Username" v-model="username" />
							</fieldset>
							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email" />
							</fieldset>
							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password" />
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</layout>
</template>

<script>
import axios from 'axios';
import Layout from '../components/layouts/Layout.vue';
export default {
	components: { Layout },
	data() {
		return {
			username: '',
			email: '',
			password: '',
			errors: [],
		};
	},
	methods: {
		handleRegister() {
			axios
				.post(`https://conduit.productionready.io/api/users`, {
					data: {
						user: {
							email: this.email,
							password: this.password,
							username: this.username,
						},
					},
				})
				.then((res) => {
					localStorage.token = res.data.user.token;
					router.push({ name: 'index' });
				})
				.catch((err) => {
					let errors = err.response.data.errors;

					let arrErrors = [];

					for (let property in errors) {
						let errMessage = `${property} ${errors[property].join(' and ')}`;
						arrErrors.push(errMessage);
					}

					this.errors = arrErrors;
				});
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
