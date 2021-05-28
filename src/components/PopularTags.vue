<template>
	<div class="sidebar">
		<p>Popular Tags</p>
		<div v-if="loadingTags" class="tag-list">Loading tags...</div>
		<div v-if="!loadingTags" class="tag-list">
			<router-link :key="tag" class="tag-pill tag-default" v-for="tag in tags" :to="{ name: 'article.index', query: { tag: tag } }">{{ tag }}</router-link>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			loadingTags: true,
			tags: [],
		};
	},
	mounted() {
		axios.get(`https://conduit.productionready.io/api/tags`).then((res) => {
			this.tags = res.data.tags.filter((tag) => tag.length > 0);
			this.loadingTags = false;
		});
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
