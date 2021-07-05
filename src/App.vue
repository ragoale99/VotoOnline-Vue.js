<template>
	<v-app>
		<the-header></the-header>
	</v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
	components: {
		TheHeader,
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
