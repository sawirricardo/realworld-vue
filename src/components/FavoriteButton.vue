<template>
	<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> {{ favoritesCount }}</button>
</template>

<script>
import axios from 'axios';
export default {
	props: {
		articleSlug: String,
		favoritesCount: Number,
	},
	setup() {
		return {};
	},
	methods: {
		handleFavorite(articleSlug) {
			axios
				.post(`https://conduit.productionready.io/api/articles/${articleSlug}/favorite`)
				.then((res) => {})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
