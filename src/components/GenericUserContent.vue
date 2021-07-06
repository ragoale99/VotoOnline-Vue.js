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
								<v-btn @click="deleteItem(item.id)" class="mx-4" color="primary"
									>Dettagli</v-btn
								>
								<v-btn @click="deleteItem(item.id)" color="success" class="px-8"
									>Inzia</v-btn
								>
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
								<v-btn @click="deleteItem(item.id)" class="mx-4" color="primary"
									>Dettagli</v-btn
								>
							</div>
						</v-card>
					</v-col>
				</v-row></v-card
			>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			votations: this.$store.getters.votationsStored,
		};
	},
};
</script>

<style scoped>
.borders {
	border: 1px solid rgb(179, 179, 179);
}
</style>
