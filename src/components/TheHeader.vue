<template>
	<header>
		<img src="./../assets/logo.png" alt="logo vue" class="logo mr-2" />
		<h1>Voto Online</h1>
		<v-btn
			color="#FFEE58"
			class="black--text last mr-4 mt-2"
			elevation="10"
			@click="logout"
		>
			<v-icon dark class="mr-2">logout</v-icon>
			<strong>Log Out</strong></v-btn
		>
		<v-btn class="mx-2 float-btn" fab dark color="red" @click="logout">
			<v-icon dark>logout</v-icon>
		</v-btn>
	</header>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$store.dispatch("setRuolo", { role: "" });
		},
	},
};
</script>

<style scoped>
header {
	height: 3em;
	background-color: #95e7c3;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	color: black;
	box-shadow: 2px 2px 2px #95e7c3;
	border-radius: 2px;
}

h1 {
	font-size: 2.8em;
}

.logo {
	width: 3em;
}

.last {
	position: absolute;
	top: 0;
	right: 0;
}

.float-btn {
	display: none;
}

@media (max-width: 768px) {
	.last {
		display: none;
	}

	.float-btn {
		display: block;
		position: fixed;
		bottom: 0.4em;
		right: 0.4em;
		z-index: 1;
	}
}
</style>
