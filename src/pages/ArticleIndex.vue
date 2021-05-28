<template>
	<layout>
		<div v-if="loadingArticles" class="home-page">Loading...</div>
		<div v-if="!loadingArticles" class="home-page">
			<div class="banner">
				<div class="container">
					<h1 class="logo-font">{{ tag }}</h1>
					<!-- <p>A place to share your knowledge.</p> -->
				</div>
			</div>

			<div class="container page">
				<div class="row">
					<div class="col-md-9">
						<!-- <div class="feed-toggle">
							<ul class="nav nav-pills outline-active">
								<li class="nav-item">
									<a class="nav-link disabled" href="">Your Feed</a>
								</li>
								<li class="nav-item">
									<a class="nav-link active" href="">Global Feed</a>
								</li>
							</ul>
						</div> -->

						<div v-if="articles.length === 0">No article with this tag</div>
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
import axios from 'axios';
import Layout from '../components/layouts/Layout.vue';
import PopularTags from '../components/PopularTags.vue';
import ArticlePreview from '../components/ArticlePreview.vue';

export default {
	components: { Layout, PopularTags, ArticlePreview },
	data() {
		return {
			loadingArticles: true,
			articles: [],
			tag: this.$route.query.tag,
		};
	},
	mounted() {
		axios
			.get(`https://conduit.productionready.io/api/articles?tag=${this.$route.query.tag}`)
			.then((res) => {
				this.loadingArticles = false;
				this.articles = res.data.articles;
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
