<template>
	<header>
		<img src="./../assets/logo.png" alt="logo vue" class="logo mr-2" />
		<h1 class="resize"><strong>VotoOnline</strong></h1>
		<v-btn
			color="#FFEE58"
			class="black--text last mr-4 mt-2"
			elevation="10"
			@click="logout"
			v-if="this.$store.getters.getRole !== ''"
		>
			<v-icon class="mr-2">logout</v-icon>
			<strong>Logout</strong></v-btn
		>
		<v-btn
			class="mx-2 float-btn"
			fab
			color="#FFEE58"
			@click="logout"
			v-if="this.$store.getters.getRole !== ''"
		>
			<v-icon color="black">logout</v-icon>
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
		bottom: 0.5em;
		right: 0.5em;
		z-index: 1;
	}

	.float-btn:hover {
		transform: scale(1.1);
		-webkit-transition: all 500ms ease;
		-moz-transition: all 500ms ease;
		-ms-transition: all 500ms ease;
		-o-transition: all 500ms ease;
		transition: all 500ms ease;
	}
}

@media (max-width: 340px) {
	.resize {
		font-size: 2.5em;
	}
	.logo {
		width: 2.5em;
	}
}
</style>
