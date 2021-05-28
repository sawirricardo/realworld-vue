<template>
	<div class="article-preview">
		<div class="article-meta">
			<router-link :to="{ name: 'user.show', params: { username: article.author.username } }"><img :src="article.author.image" /></router-link>
			<div class="info">
				<router-link class="author" :to="{ name: 'user.show', params: { username: article.author.username } }">{{ article.author.username }}</router-link>
				<span class="date">{{ getHumanCreatedAt(article.createdAt) }}</span>
			</div>
			<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> {{ article.favoritesCount }}</button>
		</div>
		<router-link class="preview-link" :to="{ name: 'article.show', params: { slug: article.slug } }">
			<h1>{{ article.title }}</h1>
			<p>{{ article.description }}</p>
			<span>Read more...</span>
		</router-link>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FavoriteButton from './FavoriteButton.vue';
dayjs.extend(relativeTime);
export default {
	props: {
		article: {
			title: String,
			slug: String,
			author: {
				username: String,
				image: String,
				following: Boolean,
			},
			body: String,
			description: String,
			createdAt: String,
			updatedAt: String,
			favoritesCount: Number,
			favorited: Boolean,
		},
	},

	methods: {
		getHumanCreatedAt(isoDateString) {
			return dayjs(isoDateString).fromNow();
		},
	},

	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
