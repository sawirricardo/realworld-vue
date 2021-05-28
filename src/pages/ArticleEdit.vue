<template>
	<layout>
		<div class="editor-page">
			<div v-if="loadingArticle" class="container page">Loading...</div>
			<div v-if="!loadingArticle" class="container page">
				<div class="row">
					<div class="col-md-10 offset-md-1 col-xs-12">
						<form>
							<fieldset>
								<fieldset class="form-group">
									<input type="text" class="form-control form-control-lg" placeholder="Article Title" />
								</fieldset>
								<fieldset class="form-group">
									<input type="text" class="form-control" placeholder="What's this article about?" />
								</fieldset>
								<fieldset class="form-group">
									<textarea class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
								</fieldset>
								<fieldset class="form-group">
									<input type="text" class="form-control" placeholder="Enter tags" />
									<div class="tag-list"></div>
								</fieldset>
								<button class="btn btn-lg pull-xs-right btn-primary" type="button">Publish Article</button>
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
	props: {
		slug: String,
	},
	methods: {
		handleUpdateArticle() {
			axios
				.put(`https://conduit.productionready.io/api/articles/${this.$props.slug}`, { data: { article: this.article } })
				.then((res) => router.push({ name: 'article.show' }))
				.catch((err) => console.log(err));
		},
	},
	data() {
		return {
			loadingArticle: true,
			article: {
				title: '',
				body: '',
				description: '',
			},
		};
	},
	mounted() {
		axios
			.get(`https://conduit.productionready.io/api/articles/${this.$props.slug}`)
			.then((res) => {
				this.article = res.data.article;
				this.loadingArticle = false;
			})
			.catch((err) => console.log(error));
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
