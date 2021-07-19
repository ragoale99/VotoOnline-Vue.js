<template>
	<v-container class="mt-4">
		<v-row class="mx-md-5" align="center">
			<v-col>
				<h1 align="center">
					Votazione: <strong>{{ selectedVotation.title }}</strong>
				</h1>
				<p class="rules" @click="onShowRules()" align="center">
					{{ !showRules ? "Apri" : "Chiudi" }} le regole da seguire per la votazione
					<img src="assets/icons/down.png" alt="" class="dropdown-img" v-if="!showRules" />
					<img src="assets/icons/up.png" alt="" class="dropdown-img" v-if="showRules" />
				</p>
				<ul v-if="showRules" class="lista">
					<li>È possibile votare <strong>una sola</strong> opzione.</li>
					<li>
						Per votare è necessario fare un
						<strong> click (da PC)</strong> o un <strong> tap (da cellulare)</strong> sull'opzione
						da votare. Si può fare nuovamente la stessa operazione sulla carta scelta per
						<strong>annulare</strong> il voto e sceglierne un'altra.
					</li>
					<li>
						Una volta selezionata la carta da votare, cliccare sul bottone
						<strong> "Termina votazione"</strong>. A questo punto si aprià una finestra in cui si
						potrà confermare la votazione o tornare indietro. Tale bottone rimarrà
						<strong> disabilitato </strong> fino a che non si avrà fatto una scelta.
					</li>
				</ul>
			</v-col>
		</v-row>

		<v-row class="mx-md-5" align="center">
			<v-col
				v-for="option in selectedVotation.options"
				:key="option.nome"
				cols="12"
				md="6"
				:lg="setNumberColums()"
			>
				<v-card
					elevation="24"
					shaped
					class="px-4 pb-4 borders mt-16 disable-select "
					:class="{
						selected: checkSelected(option),
						'card-behaviour': cardSelected === '',
						'not-selected': !checkSelected(option) && cardSelected !== '',
					}"
					tabindex="0"
					:ripple="false"
					@click="(cardSelected === '' || cardSelected === option) && setCardSelected(option)"
				>
					<div class="flex">
						<v-avatar height="150" width="150" class="mr-3 on-top">
							<img :src="getImgUrl(option.imagePath)" :alt="option.nome" />
						</v-avatar>
					</div>

					<v-card-title class="justify-center">
						<h3>{{ option.nome }}</h3>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<div class="flex mt-10">
				<p v-if="cardSelected !== ''">
					Stai votando: <strong>{{ cardSelected.nome }}</strong>
				</p>
				<v-tooltip top :disabled="cardSelected !== ''">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							<v-btn
								class="mb-8"
								color="success"
								:disabled="cardSelected === ''"
								@click="votationEnd()"
								>Termina votazione</v-btn
							>
						</div>
					</template>
					<span>Bottone disabilitato! Seleziona una carta per votarla.</span>
				</v-tooltip>
			</div>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ["selectedVotation"],
	data() {
		return {
			cardSelected: "",
			showRules: false,
		};
	},
	methods: {
		setNumberColums() {
			if (this.selectedVotation.options.length === 2) return 6;
			return 4;
		},
		getImgUrl(image) {
			return require("../assets/images/" + image);
		},
		setCardSelected(option) {
			if (this.cardSelected === "") this.cardSelected = option;
			else this.cardSelected = "";
		},
		checkSelected(option) {
			if (this.cardSelected !== "") {
				if (this.cardSelected === option) {
					return true;
				}
			}
			return false;
		},
		onShowRules() {
			this.showRules = !this.showRules;
		},
		votationEnd() {
			this.$store.dispatch("changeVotation", {
				result: this.cardSelected.nome,
				votation: this.selectedVotation,
			});
			this.$emit("backToHomePage");
			this.$emit("updateLists");
		},
	},
};
</script>

<style scoped>
.on-top {
	margin-top: -70px;
}

.borders {
	border: 1px solid rgb(179, 179, 179);
}

.flex {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.disable-select {
	user-select: none; /* supported by Chrome and Opera */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
}

.card-behaviour:hover,
.selected {
	transform: scale(1.03);
	background-color: rgba(236, 174, 234, 0.979);
	color: rgb(0, 0, 0);
	box-shadow: 5px 5px 10px rgba(131, 85, 131, 0.644);
}

.not-selected {
	background-color: rgba(230, 230, 230, 0.315);
	cursor: default;
}
</style>
