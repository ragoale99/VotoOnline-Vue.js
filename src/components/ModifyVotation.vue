<template>
	<v-container class="mt-2 contain">
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
					required
					prepend-icon="title"
				></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-textarea
					v-model="description"
					label="Description"
					required
					maxlength="100"
					:counter="100"
					clearable
					clear-icon="cancel"
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
					readonly
				></v-text-field>
				<div class="flex">
					<v-date-picker v-model="dates" range elevation="10"></v-date-picker>
				</div>
			</v-col>
			<v-col
				v-for="(option, index) in selectedVotation.options"
				:key="option.nome"
				cols="12"
			>
				<v-card elevation="24" class="pa-4">
					<div class="flex">
						<v-card-title>
							<h3>Carta {{ index + 1 }}</h3>
						</v-card-title>
					</div>

					<v-text-field
						v-model="names[index]"
						label="Nome"
						required
						prepend-icon="drive_file_rename_outline"
					></v-text-field>
					<v-file-input
						v-model="file[index]"
						accept="image/*"
						@change="onFileChange(index)"
						show-size
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
			<v-btn color="primary"
				><v-icon class="mr-2">add</v-icon>Aggiunti carta</v-btn
			>
		</div>
		<div class="flex mt-8">
			<v-btn color="success"
				><v-icon class="mr-2">auto_fix_high</v-icon>Modifica votazione</v-btn
			>
		</div>
	</v-container>
</template>

<script>
import moment from "moment";
export default {
	props: ["selectedVotation"],
	data() {
		return {
			title: this.selectedVotation.title,
			description: this.selectedVotation.description,
			names: this.inizializeNames(),
			dates: [
				moment(this.selectedVotation.dateStart).format("YYYY-MM-DD"),
				moment(this.selectedVotation.dateEnd).format("YYYY-MM-DD"),
			],
			file: [],
			url: this.inizializeUrls(),
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
</style>
