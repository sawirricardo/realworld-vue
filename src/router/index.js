import { createRouter, createWebHistory } from 'vue-router';
import Index from '../pages/Index.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import UserEdit from '../pages/UserEdit.vue';
import UserShow from '../pages/UserShow.vue';
import ArticleIndex from '../pages/ArticleIndex.vue';
import ArticleShow from '../pages/ArticleShow.vue';
import ArticleEdit from '../pages/ArticleEdit.vue';
import ArticleCreate from '../pages/ArticleCreate.vue';
import axios from 'axios';

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
	},
	{
		path: '/article/:slug',
		name: 'article.show',
		component: ArticleShow,
		props: true,
	},
	{
		path: '/app/article/:slug/edit',
		name: 'app.article.edit',
		component: ArticleEdit,
		props: true,
	},
	{
		path: '/app/article/create',
		name: 'app.article.create',
		component: ArticleCreate,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/settings',
		name: 'app.user.edit',
		component: UserEdit,
	},
	{
		path: '/profile/:username',
		name: 'user.show',
		component: UserShow,
		props: true,
	},
	{
		path: '/articles',
		name: 'article.index',
		component: ArticleIndex,
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.name !== 'app.user.edit' || to.name !== 'app.article.edit' || to.name !== 'app.article.create') {
		next();
	}
	if (to.name === 'app.user.edit' || to.name === 'app.article.create') {
		if (localStorage.getItem('token') === null) {
			next({ name: 'login' });
		} else {
			next();
		}
	}

	if (to.name === 'app.article.edit') {
		if (localStorage.getItem('token')) {
			axios
				.get(`https://conduit.productionready.io/api/user`, {
					headers: { Authorization: 'TOKEN ' + localStorage.getItem('token') },
				})
				.then((res) => {
					if (res.data.hasOwnProperty('user')) {
						axios.get(`https://conduit.productionready.io/api/articles/${to.params.slug}`).then((result) => {
							if (result.data.article.author.username !== res.data.user.username) {
								next({ name: 'article.show', params: { slug: to.params.slug } });
							} else {
								next();
							}
						});
					}
				})
				.catch((err) => {
					next({ name: 'article.show', params: { slug: to.params.slug } });
				});
		}
	}
});

export default router;
