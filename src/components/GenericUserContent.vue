<template>
	<div>
		<v-container fluid class="mt-2">
			<v-card elevation="24" outlined class="pa-4">
				<v-card-title class="justify-center pt-0"
					><h2>Votazioni disponibili</h2>
				</v-card-title>
				<v-row class="mx-md-5" align="center">
					<v-col
						v-for="votation in this.$store.getters.votationsStored"
						:key="votation.id"
						cols="12"
						md="6"
						lg="4"
					>
						<v-card elevation="24" shaped class="px-4 pb-4 borders">
							<v-card-title class="justify-center"
								>{{ votation.title }}
							</v-card-title>
							<v-card-text class="my-4">
								<v-row align="center" class="mx-0 mt-2"></v-row>
								<div>
									Small plates, salads & sandwiches - an intimate setting with
									12 indoor seats plus patio seating.
								</div>
							</v-card-text>
							<div>
								<v-dialog :retain-focus="false" v-model="dialog" width="500">
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											class="mx-4"
											color="primary"
											v-bind="attrs"
											v-on="on"
											@click="setVotation(votation)"
											>Dettagli</v-btn
										>
									</template>
									<v-card>
										<v-card-title>
											<h3>Dettagli votazione</h3>
										</v-card-title>

										<v-card-text>
											<ul>
												<li>
													Data di inizio:
													<strong>
														{{ dataFormat(selectedVotation.dateStart) }}
													</strong>
												</li>
												<li>
													Data di inizio:
													<strong
														>{{ dataFormat(selectedVotation.dateEnd) }}
													</strong>
												</li>
												<li>
													Scelte:
													<ul
														v-for="option in selectedVotation.options"
														:key="option.nome"
													>
														<div class="flex my-3">
															<v-avatar height="150" width="150" class="mr-3">
																<img
																	:src="getImgUrl(option.imagePath)"
																	:alt="option.nome"
																/>
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
											<v-btn @click="dialog = false">
												Indietro
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
								<v-btn color="success" class="px-8">Inzia</v-btn>
							</div>
						</v-card>
					</v-col>
				</v-row></v-card
			>
			<v-card elevation="24" outlined class="pa-4 mt-5">
				<v-card-title class="justify-center pt-0"
					><h2>Votazioni già concluse</h2>
				</v-card-title>
				<v-row class="mx-md-5" align="center">
					<v-col
						v-for="votation in this.$store.getters.votationsStored"
						:key="votation.id"
						cols="12"
						md="6"
						lg="4"
					>
						<v-card elevation="24" outlined shaped class="px-4 pb-4  borders">
							<v-card-title class="justify-center"
								>{{ votation.title }}
							</v-card-title>
							<v-card-text class="my-4">
								<v-row align="center" class="mx-0 mt-2"></v-row>
								<div>
									Small plates, salads & sandwiches - an intimate setting with
									12 indoor seats plus patio seating.
								</div>
							</v-card-text>
							<div>
								<v-btn class="mx-4" color="primary">Dettagli</v-btn>
							</div>
						</v-card>
					</v-col>
				</v-row></v-card
			>
		</v-container>
		<div class="text-center">
			<v-dialog v-model="dialog" width="500"> </v-dialog>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	data() {
		return {
			votations: this.$store.getters.votationsStored,
			dialog: false,
			selectedVotation: "",
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
	},
};
</script>

<style scoped>
.borders {
	border: 1px solid rgb(179, 179, 179);
}

li {
	list-style: none;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
}
</style>
