<template>
	<layout>
		<div v-if="loadingArticle">Loading...</div>
		<div v-if="!loadingArticle" class="article-page">
			<div class="banner">
				<div class="container">
					<h1>{{ article.title }}</h1>
					<article-show-meta :article="article" />
				</div>
			</div>

			<div class="container page">
				<div class="row article-content">
					<div class="col-md-12">
						<p>{{ article.description }}</p>
						<h2 id="introducing-ionic">{{ article.title }}</h2>
						<p>{{ article.body }}</p>
					</div>
				</div>

				<hr />

				<div class="article-actions">
					<article-show-meta :article="article" />
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-8 offset-md-2">
						<div v-if="!canComment" class="card">
							<div class="card-block">
								<p class="card-text">You need to <router-link :to="{ name: 'login', query: { redirectTo: `article/${article.slug}` } }">Login</router-link> first</p>
							</div>
						</div>
						<form v-if="canComment" @submit.prevent="handleSubmitComment" class="card comment-form">
							<div class="card-block">
								<textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
							</div>
							<div class="card-footer">
								<img :src="user.image" class="comment-author-img" />
								<button class="btn btn-sm btn-primary">Post Comment</button>
							</div>
						</form>

						<div v-if="loadingComments">Loading...</div>
						<div v-if="!loadingComments">
							<div v-if="comments.length === 0">No comments</div>
							<div v-if="comments.length > 0">
								<article-show-comment :key="index" v-for="(comment, index) in comments" :comment="comment" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</layout>
</template>

<script>
import axios from 'axios';
import Layout from '../components/layouts/Layout.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ArticleShowMeta from '../components/ArticleShowMeta.vue';
dayjs.extend(relativeTime);

export default {
	components: { Layout, ArticleShowMeta },
	props: { slug: String },

	data() {
		return {
			comments: [],
			article: {
				title: '',
				slug: '',
				author: {
					username: '',
					image: '',
				},
				body: '',
				description: '',
				createdAt: '',
				updatedAt: '',
				favoritesCount: 0,
				favorited: false,
			},
			comment: {
				body: '',
			},
			user: {
				image: '',
			},
			loadingArticle: true,
			loadingComments: true,
			canComment: false,
			canFollowAuthor: false,
			canFavoritePost: false,
		};
	},

	mounted() {
		axios.get(`https://conduit.productionready.io/api/articles/${this.$props.slug}`).then((res) => {
			this.loadingArticle = false;
			this.article = res.data.article;
			this.article.createdAt = dayjs(this.article.createdAt).fromNow();
		});

		axios.get(`https://conduit.productionready.io/api/articles/${this.$props.slug}/comments`).then((res) => {
			this.loadingComments = false;
			this.comments = res.data.comments;
		});

		axios
			.get('https://conduit.productionready.io/api/user')
			.then((res) => {
				if (res.data.hasOwnProperty('user')) {
					this.canComment = true;
					this.canFollowAuthor = true;
					this.canFavoritePost = true;
					this.user = res.data.user;
				}
			})
			.catch((err) => console.log(err.response.status));
	},
	methods: {
		handleSubmitComment() {},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
