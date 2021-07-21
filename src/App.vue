<template>
	<v-app>
		<the-header></the-header>
		<v-main>
			<login-page v-if="getRole === ''"></login-page>
			<generic-user-content v-if="getRole === 'genericUser'"></generic-user-content>
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;700;800&display=swap");

* {
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
}

html,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

::-webkit-scrollbar {
	width: 10px;
	height: 6px;
}
/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	-webkit-border-radius: 6px;
	border-radius: 6px;
}
/* Handle */
::-webkit-scrollbar-thumb {
	-webkit-border-radius: 6px;
	border-radius: 6px;
	background: rgba(149, 231, 195, 0.8);
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(221, 196, 196, 0.2);
}
</style>
