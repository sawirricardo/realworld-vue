<template>
	<layout>
		<div class="editor-page">
			<div class="container page">
				<div class="row">
					<div class="col-md-10 offset-md-1 col-xs-12">
						<form @submit.prevent="handleCreateArticle">
							<fieldset>
								<fieldset class="form-group">
									<input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="title" />
								</fieldset>
								<fieldset class="form-group">
									<input type="text" class="form-control" placeholder="What's this article about?" v-model="description" />
								</fieldset>
								<fieldset class="form-group">
									<textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="body"></textarea>
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
	data() {
		return {
			title: '',
			description: '',
			body: '',
			tagList: [],
		};
	},
	methods: {
		handleCreateArticle() {
			axios
				.post(`https://conduit.productionready.io/api/articles`, {
					data: {
						article: {
							title: this.title,
							body: this.body,
							description: this.description,
							tagList: this.tagList,
						},
					},
				})
				.then((res) => {
					router.push({ name: 'app.article.edit', params: { slug: res.data.article.slug } });
				})
				.catch((err) => {});
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
