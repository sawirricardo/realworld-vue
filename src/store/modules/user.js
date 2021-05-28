export default {
	state: () => ({
		username: '',
		bio: '',
		image: '',
		token: '',
		email: '',
	}),

	getters: {
		isLogin(state) {
			return localStorage.getItem('token') !== null;
		},
		getAuthenticatedUser(state) {
			return state;
		},
	},
	mutations: {
		login(state, payload) {
			state.token = payload.token;
			state.username = payload.username;
			state.email = payload.email;
			state.bio = payload.bio;
			state.image = payload.image;
			localStorage.setItem('token', payload.token);
		},
		register(state, payload) {
			state.token = payload.token;
			state.username = payload.username;
			state.email = payload.email;
			state.bio = payload.bio;
			state.image = payload.image;
			localStorage.setItem('token', payload.token);
		},
		logout(state, payload) {
			state.token = '';
			state.username = '';
			state.email = '';
			state.bio = '';
			state.image = '';
			localStorage.removeItem('token');
		},
	},
	actions: {
		login({ commit }, data) {
			commit('login', data);
		},

		register({ commit }, data) {
			commit('register', data);
		},

		logout({ commit }) {
			commit('logout');
		},
	},
};
