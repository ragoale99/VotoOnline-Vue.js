<template>
	<div>
		<div class="flex back" @click="backToMainPage">
			<v-icon large color="#4bca25">arrow_back</v-icon>
			<h2><strong>Indietro</strong></h2>
		</div>
		<v-btn class="mx-2 float-btn" fab color="#4bca25" @click="backToMainPage">
			<v-icon color="black" large>arrow_back</v-icon>
		</v-btn>
		<v-container class="mt-2 contain mb-3">
			<v-form v-model="valid" @submit.prevent="submitForm" ref="form">
				<v-row>
					<v-col cols="12">
						<div class="flex my-4">
							<h2><strong>Aggiungi una votazione</strong></h2>
						</div>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="title"
							label="Titolo"
							prepend-icon="title"
							:rules="genericRules"
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-textarea
							v-model="description"
							label="Descrizione"
							maxlength="100"
							:counter="100"
							clearable
							:rules="genericRules"
							clear-icon="backspace"
							no-resize
							rows="2"
							prepend-icon="description"
						></v-textarea>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="dateRangeText"
							label="Range di date"
							prepend-icon="date_range"
							readonly
							:rules="genericRules"
							placeholder="Modificare il calendario qui sotto"
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
					<v-row>
						<v-col cols="12">
							<div class="flex my-4">
								<h2>Inserisci opzioni</h2>
							</div>
						</v-col>
					</v-row>
					<v-col v-for="(card, index) in cards" :key="index" cols="12">
						<v-card elevation="24" class="pa-4">
							<v-icon class="on-top-right" @click="deleteCard(index)" v-if="index > 1"
								>cancel</v-icon
							>
							<div class="flex">
								<v-card-title>
									<h3>Carta {{ index + 1 }}</h3>
								</v-card-title>
							</div>

							<v-text-field
								v-model="card.nome"
								label="Nome"
								prepend-icon="drive_file_rename_outline"
								:rules="genericRules"
							></v-text-field>
							<v-file-input
								v-model="card.imagePath"
								accept="image/*"
								@change="onFileChange(index)"
								show-size
								:clearable="false"
								:rules="genericRules"
								label="Immagine (preview qui sotto)"
								prepend-icon="image"
							></v-file-input>
							<div class="flex" v-if="url[index] !== undefined">
								<v-avatar height="150" width="150" class="mr-3 on-top">
									<img :src="url[index]" :alt="card.nome + ' logo'" />
								</v-avatar>
							</div>
						</v-card>
					</v-col>
				</v-row>
				<div class="flex mt-4">
					<v-tooltip top :disabled="cards.length < 8">
						<template v-slot:activator="{ on, attrs }">
							<div v-bind="attrs" v-on="on" :class="{ disab: cards.length >= 8 }">
								<v-btn color="primary" @click="addCard" :disabled="cards.length >= 8"
									><v-icon class="mr-2">add</v-icon>Aggiungi carta</v-btn
								>
							</div>
						</template>
						<span>Bottone disabilitato! Non si possono inserire più di 8 scelte.</span>
					</v-tooltip>
				</div>
				<div class="flex mt-8">
					<v-btn color="success mb-4" type="submit" :disabled="!valid"
						><v-icon class="mr-2">auto_fix_high</v-icon>Crea votazione</v-btn
					>
				</div>
			</v-form>
		</v-container>
	</div>
</template>

<script>
/* import moment from "moment"; */
import { v4 as uuidv4 } from "uuid";
export default {
	data() {
		return {
			valid: true,
			title: "",
			description: "",
			dates: [],
			url: [],
			cards: [
				{
					nome: "",
					imagePath: null,
				},
				{
					nome: "",
					imagePath: null,
				},
			],
			genericRules: [(v) => !!v || "Il campo è obbligatorio"],
		};
	},
	methods: {
		getImgUrl(image) {
			return require("../assets/images/" + image);
		},
		onFileChange(index) {
			this.url[index] = this.getImgUrl(this.cards[index].imagePath.name);
		},
		deleteCard(index) {
			this.cards.splice(index, 1);
			this.url.splice(index, 1);
		},
		addCard() {
			this.cards.push({
				nome: "",
				imagePath: null,
			});
		},
		backToMainPage() {
			this.$emit("backToMainPage");
		},
		submitForm() {
			const optionCreated = [];

			for (let i = 0; i < this.cards.length; i++) {
				const nome = this.cards[i].nome;
				optionCreated.push({
					imagePath: this.cards[i].imagePath.name,
					nome: nome,
				});
			}

			const newVotation = {
				id: uuidv4(),
				title: this.title,
				description: this.description,
				dateStart: new Date(this.dates[0]),
				dateEnd: new Date(this.dates[1]),
				voted: false,
				result: "",
				options: optionCreated,
			};

			console.log(optionCreated);

			this.$store.dispatch("createVotation", {
				newVotation: newVotation,
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
	background-color: rgb(0, 0, 0);
	border-radius: 6px;
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
	color: #4bca25;
}

.back:hover {
	transform: scale(1.1);
	-webkit-transition: all 300ms ease;
	-moz-transition: all 300ms ease;
	-ms-transition: all 300ms ease;
	-o-transition: all 300ms ease;
	transition: all 300ms ease;
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
