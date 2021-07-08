<template>
	<v-container fluid class="mt-2">
		<v-card elevation="24" outlined class="pa-4">
			<v-card-title class="justify-center pt-0"
				><h2>Votazioni disponibili</h2>
			</v-card-title>
			<p v-if="votationsToDoEmpty === true" class="text-center mt-4 mex">
				Non ci sono votazioni disponibili in questo momento! Puoi però crearne
				una nuova!
			</p>
			<v-row class="mx-md-5" align="center" v-if="!votationsToDoEmpty">
				<v-col
					v-for="votation in votationsToDo"
					:key="votation.id"
					cols="12"
					md="6"
					:lg="setNumberColums()"
				>
					<v-card elevation="24" shaped class="px-4 pb-4 borders">
						<v-card-title class="justify-center">
							<h3>{{ votation.title }}</h3>
						</v-card-title>
						<v-card-text class="my-4">
							<v-row align="center" class="mx-0 mt-2"></v-row>
							<p class="bigger">{{ votation.description }}</p>
						</v-card-text>
						<div class="flex">
							<v-btn
								color="primary mx-4"
								depressed
								class="px-4 btn-block"
								@click="
									setVotation(votation);
									startVotation = true;
								"
							>
								<v-icon dark class="mr-2">settings</v-icon>Modifica</v-btn
							>
							<v-dialog
								:retain-focus="false"
								v-model="dialogToDelete"
								width="500"
							>
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
										<v-icon dark class="mr-2">clear</v-icon>Elimina
										votazione</v-btn
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
												votationsToDo = setVotationsToDo();
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
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			dialogToDelete: false,
			votationsToDo: "",
			votationsToDoEmpty: false,
			selectedVotation: "",
		};
	},
	methods: {
		setVotationsToDo() {
			const votationsToDo = this.getVotations.filter(
				(votation) => votation.voted === false
			);
			if (votationsToDo.length === 0) {
				this.votationsToDoEmpty = true;
				return;
			}
			return votationsToDo;
		},
		setVotation(votation) {
			this.selectedVotation = votation;
		},
		setNumberColums() {
			if (this.votationsToDo.length === 2) return 6;
			return 4;
		},
		deleteVotation(votation) {
			this.$store.dispatch("deleteVotation", { votation: votation });
		},
	},
	computed: {
		getVotations() {
			return this.$store.getters.votationsStored;
		},
	},
	beforeMount() {
		this.votationsToDo = this.setVotationsToDo();
	},
};
</script>

<style scoped>
.borders {
	border: 1px solid rgb(179, 179, 179);
}

.bigger {
	font-size: 17px;
}

.mex {
	color: red;
	font-size: 20px;
}

@media (max-width: 1005px) {
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
</style>
