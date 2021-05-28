<template>
	<layout>
		<div class="home-page">
			<div class="banner">
				<div class="container">
					<h1 class="logo-font">conduit x Ricardo Sawir</h1>
					<p>A place to share your knowledge.</p>
				</div>
			</div>

			<div class="container page">
				<div class="row">
					<div class="col-md-9">
						<div class="feed-toggle">
							<ul class="nav nav-pills outline-active">
								<li v-if="canViewFeed" class="nav-item">
									<a class="nav-link disabled" href="">Your Feed</a>
								</li>
								<li class="nav-item">
									<a class="nav-link active" href="">Global Feed</a>
								</li>
							</ul>
						</div>

						<div v-if="articles.length === 0">Loading...</div>
						<div v-if="articles.length !== 0">
							<article-preview :key="index" v-for="(article, index) in articles" :article="article" />
						</div>
					</div>

					<div class="col-md-3">
						<popular-tags />
					</div>
				</div>
			</div>
		</div>
	</layout>
</template>

<script>
import Layout from '../components/layouts/Layout.vue';
import ArticlePreview from '../components/ArticlePreview.vue';
import PopularTags from '../components/PopularTags.vue';
import axios from 'axios';
export default {
	components: { Layout, ArticlePreview, PopularTags },
	data() {
		return {
			articles: [],
			loadingArticles: true,
			canViewFeed: false,
		};
	},
	mounted() {
		axios
			.get('https://conduit.productionready.io/api/articles')
			.then((res) => {
				this.articles = res.data.articles;
				this.loadingArticles = false;
			})
			.catch((err) => console.log(err));

		if (localStorage.getItem('token')) {
			axios
				.get(`https://conduit.productionready.io/api/user`, {
					headers: { Authorization: 'TOKEN ' + localStorage.getItem('token') },
				})
				.then((res) => {
					if (res.data.hasOwnProperty('user')) {
						this.canViewFeed = true;
					}
				});
		}
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
