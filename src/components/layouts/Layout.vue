<template>
	<nav class="navbar navbar-light">
		<div class="container">
			<router-link class="navbar-brand" :to="{ name: 'index' }">conduit</router-link>
			<ul class="nav navbar-nav pull-xs-right">
				<li class="nav-item">
					<router-link active-class="active" class="nav-link" :to="{ name: 'index' }">Home</router-link>
				</li>
				<li v-if="token" class="nav-item">
					<router-link active-class="active" class="nav-link" :to="{ name: 'app.article.create' }"><i class="ion-compose"></i>&nbsp;New Post</router-link>
				</li>
				<li v-if="token" class="nav-item">
					<router-link active-class="active" class="nav-link" :to="{ name: 'app.user.edit' }"><i class="ion-gear-a"></i>&nbsp;Settings</router-link>
				</li>
				<li v-if="token" class="nav-item"><router-link class="nav-link" to="#" @click.prevent="handleLogout">Logout</router-link></li>
				<li v-if="!token" class="nav-item">
					<router-link active-class="active" class="nav-link" :to="{ name: 'register' }">Sign up</router-link>
				</li>
				<li v-if="!token" class="nav-item">
					<router-link active-class="active" class="nav-link" :to="{ name: 'login' }">Login</router-link>
				</li>
			</ul>
		</div>
	</nav>
	<slot />
	<footer>
		<div class="container">
			<router-link class="logo-font" :to="{ name: 'index' }">conduit x Ricardo Sawir</router-link>
			<span class="attribution"> An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT. </span>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			token: '',
		};
	},

	mounted() {
		if (localStorage.token) {
			this.token = localStorage.token;
		}
	},

	methods: {
		handleLogout() {
			localStorage.removeItem('token');
			this.token = '';
			router.push({ name: 'login' });
		},
	},
};
</script>

<style lang="scss" scoped></style>
