<template>
	<div>
		<div v-if="!startVotation">
			<v-container fluid class="mt-2">
				<v-card elevation="24" outlined class="pa-4">
					<v-card-title class="justify-center pt-0"
						><h2 class="resize">Votazioni disponibili</h2>
					</v-card-title>
					<p v-if="votationsToDoEmpty === true" class="text-center mt-4 mex">
						Non ci sono votazioni disponibili in questo momento!
					</p>
					<v-row class="mx-md-5" align="center" v-if="!votationsToDoEmpty">
						<v-col
							v-for="votation in votationsToDo"
							:key="votation.id"
							cols="12"
							:md="setNumberColums('md', votationsToDo)"
							:lg="setNumberColums('lg', votationsToDo)"
						>
							<v-card
								elevation="24"
								shaped
								class="px-4 pb-4 borders"
								:class="{ future: !checkDate(votation.dateStart) }"
							>
								<v-card-title class="justify-center">
									<h3>{{ votation.title }}</h3>
								</v-card-title>
								<v-card-text class="my-4">
									<p class="bigger" :class="{ 'future-text': !checkDate(votation.dateStart) }">
										{{
											!checkDate(votation.dateStart)
												? "La votazione inizierà il " + dataFormat(votation.dateStart)
												: votation.description
										}}
									</p>
								</v-card-text>

								<div class="flex buttons">
									<v-dialog :retain-focus="false" v-model="dialogToDo" width="500">
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												class="mx-4 px-4 btn-block"
												color="primary"
												v-bind="attrs"
												v-on="on"
												:disabled="!checkDate(votation.dateStart)"
												@click="setVotation(votation)"
												><v-icon class="mr-2">info</v-icon>Dettagli</v-btn
											>
										</template>

										<v-card>
											<v-card-title>
												<h3>Dettagli votazione</h3>
											</v-card-title>

											<v-divider></v-divider>

											<v-card-text>
												<ul class="mt-2">
													<li>
														Data di inizio:
														<strong>
															{{ dataFormat(selectedVotation.dateStart) }}
														</strong>
													</li>
													<li>
														Data di fine:
														<strong>{{ dataFormat(selectedVotation.dateEnd) }} </strong>
													</li>
													<li>
														Scelte:
														<ul v-for="option in selectedVotation.options" :key="option.nome">
															<div class="flex my-3">
																<v-avatar height="150" width="150" class="mr-3">
																	<img :src="getImgUrl(option.imagePath)" :alt="option.nome" />
																</v-avatar>
																<li>
																	<h2>{{ option.nome }}</h2>
																</li>
															</div>
														</ul>
													</li>
												</ul>
											</v-card-text>

											<v-divider></v-divider>

											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn @click="dialogToDo = false">
													Indietro
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									<v-btn
										color="success"
										class="px-4 btn-block"
										:disabled="!checkDate(votation.dateStart)"
										@click="
											setVotation(votation);
											startVotation = true;
										"
										><v-icon class="mr-2">play_arrow</v-icon>Inizia votazione</v-btn
									>
								</div>
							</v-card>
						</v-col>
					</v-row></v-card
				>
				<v-card elevation="24" outlined class="pa-4 mt-5">
					<v-card-title class="justify-center pt-0"
						><h2 class="resize">Votazioni già concluse</h2>
					</v-card-title>
					<p v-if="votationsDoneEmpty" class="text-center mt-4 mex">
						Non hai fatto nessuna votazione in passato.
					</p>
					<v-row class="mx-md-5" align="center" v-if="!votationsDoneEmpty">
						<v-col
							v-for="votation in votationsDone"
							:key="votation.id"
							cols="12"
							:md="setNumberColums('md', votationsDone)"
							:lg="setNumberColums('lg', votationsDone)"
						>
							<v-card elevation="24" outlined shaped class="px-4 pb-4  borders">
								<v-card-title class="justify-center"
									><h3>{{ votation.title }}</h3>
								</v-card-title>
								<v-card-text class="my-4">
									<v-row align="center" class=" mx-0 mt-2"></v-row>
									<p class="bigger">{{ votation.description }}</p>
								</v-card-text>
								<div class="flex">
									<v-dialog :retain-focus="false" v-model="dialogDone" width="500">
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												class="mx-4 btn-block"
												color="primary"
												v-bind="attrs"
												v-on="on"
												@click="setVotation(votation)"
												><v-icon class="mr-2">info</v-icon>Dettagli</v-btn
											>
										</template>

										<v-card>
											<v-card-title>
												<h3>Dettagli votazione</h3>
											</v-card-title>

											<v-divider></v-divider>

											<v-card-text>
												<ul class="mt-2">
													<li>
														Data di inizio:
														<strong>
															{{ dataFormat(selectedVotation.dateStart) }}
														</strong>
													</li>
													<li>
														Data di fine:
														<strong>{{ dataFormat(selectedVotation.dateEnd) }} </strong>
													</li>
													<li>
														Hai votato:
														<strong>{{ selectedVotation.result }}</strong>
													</li>
												</ul>
											</v-card-text>

											<v-divider></v-divider>

											<v-card-actions>
												<v-spacer></v-spacer>
												<v-btn @click="dialogDone = false">
													Indietro
												</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-container>
			<div class="text-center">
				<v-dialog v-model="dialog" width="500"> </v-dialog>
			</div>
		</div>
		<votation
			v-if="startVotation"
			:selected-votation="selectedVotation"
			@backToHomePage="startVotation = false"
			@updateLists="
				votationsToDo = setVotationsToDo();
				votationsDone = setVotationsDone();
			"
		></votation>
	</div>
</template>

<script>
import moment from "moment";
import Votation from "./Votation.vue";

export default {
	components: {
		Votation,
	},
	data() {
		return {
			dialog: false,
			selectedVotation: "",
			votationsToDo: "",
			votationsDone: "",
			startVotation: false,
			dialogDone: "",
			dialogToDo: "",
			votationsToDoEmpty: false,
			votationsDoneEmpty: false,
		};
	},
	methods: {
		dataFormat(data) {
			return moment(data).format("DD/MM/YYYY");
		},
		setVotation(votation) {
			this.selectedVotation = votation;
		},
		getImgUrl(image) {
			return require("../assets/images/" + image);
		},
		setVotationsToDo() {
			/* var today = new Date();   && today <= dateEnd*/
			const votationsToDo = this.getVotations.filter((votation) => votation.voted === false);
			if (votationsToDo.length === 0) {
				this.votationsToDoEmpty = true;
				return;
			}
			return votationsToDo;
			/* const dateEnd = new Date(votation.dataEnd); */
		},
		setVotationsDone() {
			const votationsDone = this.getVotations.filter((votation) => votation.voted !== false);
			if (votationsDone.length === 0) {
				this.votationsToDoEmpty = true;
				return;
			}
			return votationsDone;
		},
		setNumberColums(size, votations) {
			if (votations.length === 1) return 12;
			if (votations.length === 2 || size === "md") return 6;
			if (size === "lg") return 4;
			return;
		},
		checkDate(data) {
			const today = new Date();
			const date = new Date(data);
			return date.getTime() <= today.getTime();
		},
	},
	computed: {
		getVotations() {
			return this.$store.getters.votationsStored;
		},
		getRole() {
			return this.$store.getters.getRole;
		},
	},
	beforeMount() {
		this.votationsToDo = this.setVotationsToDo();
		this.votationsDone = this.setVotationsDone();
	},
};
</script>

<style scoped>
.borders {
	border: 1px solid rgb(179, 179, 179);
	min-height: 14em !important;
	position: relative;
}

li {
	list-style: none;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.bigger {
	font-size: 17px;
}

.mex {
	color: red;
	font-size: 20px;
}

.future-text {
	font-size: 22px;
	font-weight: bold;
	color: rgb(197, 27, 27) !important;
}

.future {
	background-color: rgb(97, 97, 97);
}

.buttons {
	position: absolute;
	bottom: 1em;
}

@media (max-width: 1100px) {
	.flex {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.btn-block {
		width: 100%;
		margin-bottom: 0.8em;
	}
}

@media (max-width: 414px) {
	.resize {
		font-size: 1.05em;
	}
}
</style>
