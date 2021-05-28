<template>
	<div class="card">
		<div class="card-block">
			<p class="card-text">{{ comment.body }}</p>
		</div>
		<div class="card-footer">
			<router-link class="comment-author" :to="{ name: 'user.show', params: { username: comment.author.username } }">
				<img :src="comment.author.username" class="comment-author-img" />
			</router-link>
			&nbsp;
			<router-link :to="{ name: 'user.show', params: { username: comment.author.username } }" class="comment-author">{{ comment.author.username }}</router-link>
			<span class="date-posted">{{ getHumanCreatedAt(comment.createdAt) }}</span>
			<span class="mod-options">
				<i class="ion-edit"></i>
				<i class="ion-trash-a"></i>
			</span>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default {
	props: {
		comment: {
			body: String,
			author: {
				username: String,
				image: String,
			},
			createdAt: String,
			updatedAt: String,
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
