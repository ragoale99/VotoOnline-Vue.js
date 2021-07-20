import Vuex from "vuex";
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
/* import createPersistedState from "vuex-persistedstate"; */

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
	/* 	plugins: [createPersistedState()], */
	state() {
		return {
			votations: [
				{
					id: uuidv4(),
					title: "Piatti italiani",
					description: "Votazione per il piatto italiano più buono",
					dateStart: new Date(),
					dateEnd: new Date("2022, 04 ,10"),
					voted: true,
					result: "Pizza",
					options: [
						{ imagePath: "vue.png", nome: "Pizza" },
						{
							imagePath: "angular.png",
							nome: "Pizza",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Frameworks",
					description:
						"Votazione per la scelta del miglior framework per lo sviluppo front-end di applicazioni web",
					dateStart: new Date("2020, 04, 10"),
					dateEnd: new Date("2022, 04 ,10"),
					voted: false,
					result: "",
					options: [
						{
							imagePath: "vue.png",
							nome: "Vue.js",
						},
						{
							imagePath: "angular.png",
							nome: "Angular",
						},
						{
							imagePath: "react.png",
							nome: "React",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Cani",
					description: "Votazione per il cane più bello",
					dateStart: new Date("2020, 04, 10"),
					dateEnd: new Date("2022, 04, 10"),
					voted: false,
					result: "",
					options: [
						{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
						{
							imagePath: "doberman.jpg",
							nome: "Doberman",
						},
						{
							imagePath: "labrador.jpg",
							nome: "Labrador",
						},
						{
							imagePath: "golden_retriver.jpg",
							nome: "Golden retriever",
						},
						{ imagePath: "beagle.jpg", nome: "Beagle" },
						{
							imagePath: "pitbull.jpg",
							nome: "Pitbull",
						},
						{
							imagePath: "bassotto.jpg",
							nome: "Bassotto",
						},
						{
							imagePath: "rottweiler.jpg",
							nome: "Rottweiler",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Mete estive",
					description: "Votazione per la meta estiva preferita dagli italiani",
					dateStart: new Date("2022, 04, 10"),
					dateEnd: new Date("2022, 05, 10"),
					voted: false,
					result: "",
					options: [
						{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
						{
							imagePath: "doberman.jpg",
							nome: "Doberman",
						},
						{
							imagePath: "labrador.jpg",
							nome: "Labrador",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Gatti",
					description: "Votazione per il gatto più bello",
					dateStart: new Date("2020, 04, 10"),
					dateEnd: new Date("2022, 04, 10"),
					voted: true,
					result: "Persiano",
					options: [
						{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
						{
							imagePath: "doberman.jpg",
							nome: "Persiano",
						},
					],
				},
			],
			role: "genericUser",
		};
	},
	mutations: rootMutations,
	actions: rootActions,
	getters: rootGetters,
});

export default store;
