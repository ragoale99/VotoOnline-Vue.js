<template>
	<v-card
		outlined
		shaped
		:class="[
			'mx-auto',
			'my-12',
			'elevation-card',
			{ err: !valid && touched, succ: valid },
		]"
		:loading="loading"
		max-width="90%"
		width="500"
	>
		<v-img height="100" contain src="./../assets/key.png" class="mt-2"></v-img>
		<v-card-title class="justify-center">Accedi per votare online</v-card-title>
		<v-form
			ref="form"
			v-model="valid"
			class="form mx-auto"
			@submit.prevent="submitForm"
		>
			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				@input="setTouched"
				@blur="setTouched"
				required
				prepend-icon="email"
			></v-text-field>
			<v-text-field
				v-model="password"
				:append-icon="show ? 'visibility' : 'visibility_off'"
				@click:append="() => (show = !show)"
				:type="show ? 'password' : 'text'"
				:counter="10"
				:rules="passRules"
				@input="setTouched"
				@blur="setTouched"
				label="Password"
				autocomplete="on"
				required
				prepend-icon="vpn_key"
			></v-text-field>
			<v-tooltip top :disabled="valid">
				<template v-slot:activator="{ on, attrs }">
					<div
						:class="['container-flex', 'my-4', { disab: !valid }]"
						v-bind="attrs"
						v-on="on"
					>
						<v-btn
							class="mx-auto px-8"
							:disabled="!valid"
							type="submit"
							color="success"
							@click="validate"
							width="100%"
						>
							Accedi
						</v-btn>
					</div>
				</template>
				<span>Il bottone è disabilitato!</span>
				<br />
				<span> Controlla che email e password siano validi.</span>
			</v-tooltip>
		</v-form>
	</v-card>
</template>

<script>
import axios from "axios";
export default {
	emits: ["changeRole"],
	data() {
		return {
			show: true,
			valid: true,
			touched: false,
			loading: false,
			password: "",
			passRules: [
				(v) => !!v || "La password è obbligatoria",
				(v) =>
					(v && v.length <= 10) ||
					"La password non può avere più di 10 caratteri",
				(v) =>
					(v && v.length >= 4) ||
					"La password deve essere di almeno 4 caratteri",
			],
			email: "",
			emailRules: [
				(v) => !!v || "L'email è obbligatoria",
				(v) => /.+@.+\..+/.test(v) || "L'email deve essere valida",
			],
		};
	},
	methods: {
		submitForm() {
			this.loading = true;
			if (this.password !== "admin") {
				axios
					.post("http://127.0.0.1:3100/login?__example=genericUser", {
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						const ruolo = response.data.role;
						this.$emit("changeRole", ruolo);
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				axios
					.post("http://127.0.0.1:3100/login?__example=admin", {
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						const ruolo = response.data.role;
						this.$emit("changeRole", ruolo);
					})
					.catch((error) => {
						console.log(error);
					});
			}

			this.$refs.form.reset();
			this.touched = false;
			this.loading = false;
		},
		validate() {
			this.$refs.form.validate();
		},
		setTouched() {
			this.touched = true;
		},
	},
};
</script>

<style scoped>
.form {
	width: 90%;
}

.elevation-card {
	box-shadow: -3px 3px #3d413fbb;
}

.container-flex {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.err {
	box-shadow: -3px 3px #ff0000bb;
}

.succ {
	box-shadow: -3px 3px #00ff15bb;
}

.disab {
	cursor: not-allowed;
}

.v-application .primary--text {
	color: #95e7c3 !important;
	-webkit-text-fill-color: #95e7c3 !important;
}
</style>
