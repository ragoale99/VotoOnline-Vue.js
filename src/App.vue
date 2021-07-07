<template>
	<v-app>
		<the-header></the-header>
		<v-main>
			<login-page v-if="getRole === ''"></login-page>
			<generic-user-content
				v-if="getRole === 'genericUser'"
			></generic-user-content>
			<admin-content v-if="getRole === 'admin'"></admin-content>
		</v-main>
	</v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import LoginPage from "./components/LoginPage.vue";
import GenericUserContent from "./components/GenericUserContent.vue";
import AdminContent from "./components/AdminContent.vue";

export default {
	components: {
		TheHeader,
		LoginPage,
		GenericUserContent,
		AdminContent,
	},
	computed: {
		getRole() {
			return this.$store.getters.getRole;
		},
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

* {
	font-family: "Poppins", sans-serif;
}

html,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>
