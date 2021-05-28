<template>
	<layout>
		<div class="settings-page">
			<div v-if="loadingUser" class="container page">Loading...</div>
			<div v-if="!loadingUser" class="container page">
				<div class="row">
					<div class="col-md-6 offset-md-3 col-xs-12">
						<h1 class="text-xs-center">Your Settings</h1>
						<div v-if="savedStatus === 'submitted'">
							<div class="alert alert-success">Settings saved!</div>
						</div>
						<div v-if="savedStatus === 'not_submitted'">
							<div class="alert alert-success">An error occured. Please try again.</div>
						</div>
						<form @submit.prevent="handleSaveUser">
							<fieldset>
								<fieldset class="form-group">
									<input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image" />
								</fieldset>
								<fieldset class="form-group">
									<input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" />
								</fieldset>
								<fieldset class="form-group">
									<textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
								</fieldset>
								<fieldset class="form-group">
									<input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" />
								</fieldset>
								<fieldset class="form-group">
									<input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" />
								</fieldset>
								<button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
							</fieldset>
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
import router from '../router';
export default {
	components: { Layout },
	data() {
		return { user: {}, loadingUser: true, savedStatus: 'not_submitted' };
	},
	methods: {
		handleSaveUser() {
			axios
				.put(`https://conduit.productionready.io/api/user`, { headers: { Authorization: 'TOKEN ' + localStorage.getItem('token') } })
				.then((res) => {
					this.savedStatus = 'submitted';
				})
				.catch((err) => {
					this.savedStatus = 'failed';
				});
		},
	},
	mounted() {
		if (localStorage.getItem('token')) {
			axios
				.get(`https://conduit.productionready.io/api/user`, { headers: { Authorization: 'TOKEN ' + localStorage.getItem('token') } })
				.then((res) => {
					this.user = res.data.user;
					this.loadingUser = false;
				})
				.catch((err) => {
					router.push({ name: 'login' });
				});
		} else {
			router.push({ name: 'login' });
		}
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
