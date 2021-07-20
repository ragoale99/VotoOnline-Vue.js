<template>
	<div>
		<v-container fluid class="mt-2" v-if="!modifyVotation && !addVotation">
			<v-card elevation="24" outlined class="pa-4">
				<v-card-title class="justify-center pt-0"
					><h2 class="resize">Votazioni disponibili</h2>
				</v-card-title>
				<p v-if="getVotations().length === 0" class="text-center mt-4 mex">
					Non ci sono votazioni disponibili in questo momento! Puoi però crearne una nuova!
				</p>
				<v-row class="mx-md-5" align="stretch" v-if="getVotations().length !== 0">
					<v-col
						v-for="votation in getVotations()"
						:key="votation.id"
						cols="12"
						:md="setNumberColums('md')"
						:lg="setNumberColums('lg')"
					>
						<v-card elevation="24" shaped class="px-4 pb-4 borders" height="100%">
							<v-card-title class="justify-center">
								<h3>{{ votation.title }}</h3>
							</v-card-title>
							<v-card-text class="my-5 ">
								<v-row align="center" class="mx-0 mt-2"></v-row>
								<p class="bigger">{{ votation.description }}</p>
							</v-card-text>
							<div class="flex buttons">
								<v-btn
									color="primary mx-4"
									depressed
									class="px-4 btn-block"
									@click="
										setVotation(votation);
										modifyVotation = true;
									"
								>
									<v-icon class="mr-2">settings</v-icon>Modifica</v-btn
								>
								<v-dialog :retain-focus="false" v-model="dialogToDelete" width="500">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											color="error"
											depressed
											class="px-4 btn-block"
											v-bind="attrs"
											v-on="on"
											@click="
												setVotation(votation);
												startVotation = true;
											"
										>
											<v-icon class="mr-2">clear</v-icon>Elimina votazione</v-btn
										>
									</template>
									<v-card>
										<v-card-title>
											<h3>Elimina la votazione</h3>
										</v-card-title>

										<v-divider></v-divider>

										<v-card-text class="mt-4 bigger"
											>Sicuro di voler eliminare la votazione?</v-card-text
										>
										<v-divider></v-divider>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn @click="dialogToDelete = false" class="px-4">
												Indietro
											</v-btn>
											<v-btn
												@click="
													deleteVotation(selectedVotation);
													dialogToDelete = false;
												"
												color="error"
												class="px-4"
											>
												Elimina
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
			<div class="flex-centered mt-5">
				<v-btn @click="addVotation = true" color="success" class="px-4"
					><v-icon class="mr-2">add</v-icon>
					Crea una nuova votazione
				</v-btn>
			</div>
		</v-container>
		<modify-votation
			v-if="modifyVotation"
			:selected-votation="selectedVotation"
			@backToMainPage="modifyVotation = false"
		></modify-votation>
		<add-votation v-if="addVotation" @backToMainPage="addVotation = false"></add-votation>
	</div>
</template>

<script>
import ModifyVotation from "./ModifyVotation.vue";
import AddVotation from "./AddVotation.vue";

export default {
	components: {
		ModifyVotation,
		AddVotation,
	},
	data() {
		return {
			dialogToDelete: false,
			selectedVotation: "",
			modifyVotation: false,
			addVotation: false,
		};
	},
	methods: {
		getVotations() {
			return this.$store.getters.votationsStored;
		},
		setVotation(votation) {
			this.selectedVotation = votation;
		},
		setNumberColums(size) {
			if (this.getVotations().length === 1) return 12;
			if (this.getVotations().length === 2 || size === "md") return 6;
			if (size === "lg") return 4;
			return;
		},
		deleteVotation(votation) {
			this.$store.dispatch("deleteVotation", { votation: votation });
		},
	},
};
</script>

<style scoped>
.borders {
	border: 1px solid rgb(179, 179, 179);
	/* 	min-height: 14em !important; */
	position: relative;
}

.bigger {
	font-size: 17px;
}

.mex {
	color: red;
	font-size: 20px;
}

.flex-centered {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.buttons {
	position: absolute;
	bottom: 1em;
}

@media (max-width: 1100px) {
	.buttons {
		position: static;
		bottom: 0em;
	}
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
