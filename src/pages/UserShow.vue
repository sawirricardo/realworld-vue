<template>
	<layout>
		<div v-if="loadingUser" class="profile-page">Loading...</div>
		<div v-if="!loadingUser" class="profile-page">
			<div class="user-info">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-md-10 offset-md-1">
							<img :src="user.image" class="user-img" />
							<h4>{{ user.username }}</h4>
							<p>{{ user.bio }}</p>
							<button class="btn btn-sm btn-outline-secondary action-btn">
								<i class="ion-plus-round"></i>
								&nbsp; Follow {{ user.username }}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<div class="articles-toggle">
							<ul class="nav nav-pills outline-active">
								<li class="nav-item">
									<a class="nav-link active" href="">My Articles</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="">Favorited Articles</a>
								</li>
							</ul>
						</div>

						<div v-if="loadingArticles">Loading...</div>
						<div v-if="!loadingArticles">
							<div v-if="articles.length === 0">{{ user.username }} has not published yet.</div>
							<div v-if="articles.length > 0">
								<article-preview :key="article.slug" v-for="article in articles" :article="article" />
							</div>
						</div>
						<!-- <div class="article-preview">
							<div class="article-meta">
								<router-link :to="{ name: 'user.show', params: { username: user.username } }"><img :src="user.image" /></router-link>
								<div class="info">
									<router-link class="author" :to="{ name: 'user.show', params: { username: user.username } }">{{ user.username }}</router-link>
									<span class="date">January 20th</span>
								</div>
								<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 29</button>
							</div>
							<a href="" class="preview-link">
								<h1>How to build webapps that scale</h1>
								<p>This is the description for the post.</p>
								<span>Read more...</span>
							</a>
						</div>

						<div class="article-preview">
							<div class="article-meta">
								<a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
								<div class="info">
									<a href="" class="author">Albert Pai</a>
									<span class="date">January 20th</span>
								</div>
								<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 32</button>
							</div>
							<a href="" class="preview-link">
								<h1>The song you won't ever stop singing. No matter how hard you try.</h1>
								<p>This is the description for the post.</p>
								<span>Read more...</span>
								<ul class="tag-list">
									<li class="tag-default tag-pill tag-outline">Music</li>
									<li class="tag-default tag-pill tag-outline">Song</li>
								</ul>
							</a>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</layout>
</template>

<script>
import axios from 'axios';
import Layout from '../components/layouts/Layout.vue';
import ArticlePreview from '../components/ArticlePreview.vue';
export default {
	components: { Layout, ArticlePreview },
	props: {
		username: String,
	},
	data() {
		return {
			loadingUser: true,
			loadingArticles: true,
			user: {
				bio: String,
				username: String,
				email: String,
				image: String,
			},
			articles: [],
			favoritedArticles: [],
		};
	},
	mounted() {
		axios
			.get(`https://conduit.productionready.io/api/profiles/${this.$props.username}`)
			.then((res) => {
				this.user = res.data.profile;
				this.loadingUser = false;
			})
			.catch((err) => console.log(err));

		axios
			.get(`https://conduit.productionready.io/api/articles?author=${this.$props.username}`)
			.then((res) => {
				this.articles = res.data.articles;
				this.loadingArticles = false;
				console.log(this.articles);
			})
			.catch((err) => console.log(err));
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
