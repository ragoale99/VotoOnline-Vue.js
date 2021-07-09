<template>
	<div>
		<div class="flex back" @click="backToMainPage">
			<v-icon class="mr-1" large color="blue">arrow_back</v-icon>
			<h3><strong>Indietro</strong></h3>
		</div>
		<v-btn class="mx-2 float-btn" fab color="#2296f3" @click="backToMainPage">
			<v-icon color="black" large>arrow_back</v-icon>
		</v-btn>
		<v-container class="mt-2 contain">
			<v-form v-model="valid" @submit.prevent="submitForm" ref="form">
				<v-row>
					<v-col cols="12">
						<div class="flex my-4">
							<h2>Modifica votazione</h2>
						</div>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="title"
							label="Title"
							:rules="genericRules"
							prepend-icon="title"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-textarea
							v-model="description"
							label="Description"
							:rules="genericRules"
							maxlength="100"
							:counter="100"
							clearable
							clear-icon="backspace"
							no-resize
							rows="2"
							prepend-icon="description"
						></v-textarea>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="dateRangeText"
							label="Date range"
							prepend-icon="date_range"
							:rules="genericRules"
							readonly
						></v-text-field>
						<div class="flex">
							<v-date-picker
								v-model="dates"
								:allowed-dates="disablePastDates"
								range
								elevation="10"
							></v-date-picker>
						</div>
					</v-col>
					<v-col
						v-for="(option, index) in selectedVotation.options"
						:key="option.nome"
						cols="12"
					>
						<v-card elevation="24" class="pa-4">
							<v-icon
								class="on-top-right"
								@click="deleteCard(index)"
								v-if="index > 1"
								>cancel</v-icon
							>
							<div class="flex">
								<v-card-title>
									<h3>Carta {{ index + 1 }}</h3>
								</v-card-title>
							</div>

							<v-text-field
								v-model="names[index]"
								label="Nome"
								:rules="genericRules"
								prepend-icon="drive_file_rename_outline"
							></v-text-field>
							<v-file-input
								v-model="file[index]"
								accept="image/*"
								@change="onFileChange(index)"
								show-size
								:clearable="false"
								label="Immagine (preview qui sotto)"
								prepend-icon="image"
							></v-file-input>
							<div class="flex" v-if="url[index] !== undefined">
								<v-avatar height="150" width="150" class="mr-3 on-top">
									<img :src="url[index]" :alt="option.name + ' logo'" />
								</v-avatar>
							</div>
						</v-card>
					</v-col>
				</v-row>
				<div class="flex mt-4">
					<v-tooltip top :disabled="selectedVotation.options.length < 8">
						<template v-slot:activator="{ on, attrs }">
							<div
								v-bind="attrs"
								v-on="on"
								:class="{ disab: selectedVotation.options.length >= 8 }"
							>
								<v-btn
									color="primary"
									@click="addCard"
									:disabled="selectedVotation.options.length >= 8"
									><v-icon class="mr-2">add</v-icon>Aggiungi carta</v-btn
								>
							</div>
						</template>
						<span
							>Bottone disabilitato! Non si possono inserire più di 8
							scelte.</span
						>
					</v-tooltip>
				</div>
				<div class="flex mt-8">
					<v-btn color="success mb-4" type="submit" :disabled="!valid"
						><v-icon class="mr-2">auto_fix_high</v-icon>Modifica
						votazione</v-btn
					>
				</div>
			</v-form>
		</v-container>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: ["selectedVotation"],
	data() {
		return {
			valid: true,
			title: this.selectedVotation.title,
			description: this.selectedVotation.description,
			names: this.inizializeNames(),
			dates: [
				moment(this.selectedVotation.dateStart).format("YYYY-MM-DD"),
				moment(this.selectedVotation.dateEnd).format("YYYY-MM-DD"),
			],
			file: [],
			url: this.inizializeUrls(),
			genericRules: [(v) => !!v || "Il campo è obbligatorio"],
		};
	},
	methods: {
		getImgUrl(image) {
			return require("../assets/images/" + image);
		},
		onFileChange(index) {
			this.url[index] = this.getImgUrl(this.file[index].name);
		},
		inizializeNames() {
			let arr = [];
			for (let i = 0; i < this.selectedVotation.options.length; i++) {
				arr.push(this.selectedVotation.options[i].nome);
			}
			return arr;
		},
		inizializeUrls() {
			let arr = [];
			for (let i = 0; i < this.selectedVotation.options.length; i++) {
				arr.push(this.getImgUrl(this.selectedVotation.options[i].imagePath));
			}
			return arr;
		},
		deleteCard(index) {
			this.selectedVotation.options.splice(index, 1);
			this.url.splice(index, 1);
			this.names.splice(index, 1);
			this.file.splice(index, 1);
		},
		addCard() {
			this.selectedVotation.options.push({
				imagePath: "",
				nome: "",
			});
		},
		backToMainPage() {
			this.$emit("backToMainPage");
		},
		submitForm() {
			const optionModified = [];

			for (let i = 0; i < this.names.length; i++) {
				const nome = this.names[i];
				if (this.file[i] === undefined) {
					optionModified.push({
						imagePath: this.selectedVotation.options[i].imagePath,
						nome: nome,
					});
				} else {
					optionModified.push({
						imagePath: this.file[i].name,
						nome: nome,
					});
				}
			}

			const votationModified = {
				id: this.selectedVotation.id,
				title: this.title,
				description: this.description,
				dateStart: new Date(this.dates[0]),
				dateEnd: new Date(this.dates[1]),
				voted: this.selectedVotation.voted,
				result: this.selectedVotation.result,
				options: optionModified,
			};

			this.$store.dispatch("modifyVotation", {
				votationModified: votationModified,
			});

			this.$emit("updateList");
			this.backToMainPage();
		},
		disablePastDates(val) {
			return val >= new Date().toISOString().substr(0, 10);
		},
	},
	computed: {
		dateRangeText() {
			return this.dates.join(" ~ ");
		},
	},
};
</script>

<style scoped>
.contain {
	width: 50em;
	max-width: 90%;
}

.flex {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.on-top-right {
	position: absolute;
	top: 1em;
	right: 1em;
}

.back {
	position: absolute;
	top: 1em;
	left: 1em;
	color: #2296f3;
}

.back:hover {
	transform: scale(1.1);
	-webkit-transition: all 500ms ease;
	-moz-transition: all 500ms ease;
	-ms-transition: all 500ms ease;
	-o-transition: all 500ms ease;
	transition: all 500ms ease;
	cursor: pointer;
	user-select: none; /* supported by Chrome and Opera */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
}

.disab {
	cursor: not-allowed;
}

/* .v-application .primary--text {
	color: #95e7c3 !important;
	-webkit-text-fill-color: #95e7c3 !important;
} */

.float-btn {
	display: none;
}

@media (max-width: 1100px) {
	.back {
		display: none;
	}

	.float-btn {
		display: block;
		position: fixed;
		bottom: 0.5em;
		left: 0.5em;
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
</style>
