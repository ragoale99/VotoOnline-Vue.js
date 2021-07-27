<template>
	<header>
		<img src="./../assets/logo.png" alt="logo vue" class="logo mr-2" />
		<h1 class="resize"><strong>VotoOnline</strong></h1>
		<v-dialog :retain-focus="false" v-model="dialogToLogout" width="500" v-if="getRole !== ''">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					color="#FFEE58"
					class="black--text last mr-4 mt-1"
					elevation="10"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon class="mr-2">logout</v-icon>
					<strong>Logout</strong></v-btn
				>
				<v-btn class="mx-2 float-btn" fab color="#FFEE58" v-bind="attrs" v-on="on">
					<v-icon color="black">logout</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<h3>Sicuro di voler effettuare il logout?</h3>
				</v-card-title>

				<v-divider></v-divider>

				<v-card-text class="mt-4 bigger"
					><h3>Verrai riportato alla pagina di login.</h3></v-card-text
				>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="dialogToLogout = false" class="px-4">
						Indietro
					</v-btn>
					<v-btn
						@click="
							logout();
							dialogToLogout = false;
						"
						color="error"
						class="px-4"
					>
						Esci
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</header>
</template>

<script>
export default {
	data() {
		return {
			dialogToLogout: false,
		};
	},
	methods: {
		logout() {
			this.$store.dispatch("setRuolo", { role: "" });
		},
	},
	computed: {
		getRole() {
			console.log(this.$store.getters.getRole !== "");
			return this.$store.getters.getRole;
		},
	},
};
</script>

<style scoped>
header {
	height: 3em;
	background-color: #9ce795;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	color: black;
	border-radius: 2px;
}

h1 {
	font-size: 2.5em;
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
