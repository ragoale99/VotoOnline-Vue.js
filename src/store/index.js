import Vuex from "vuex";
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";
/* import counterModule from './modules/counter/index.js'; */

Vue.use(Vuex);

export const store = new Vuex.Store({
	/*   modules: {
    numbers: counterModule
  }, */
	state() {
		return {
			votations: [
				{
					id: uuidv4(),
					title: "Comunali",
					description: "Votazione per la scelta del sindaco di Rubano",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: false,
					result: "",
					options: [
						{ imagePath: "lega.jpg", nome: "Lega Nord" },
						{
							imagePath: "potere_al_popolo.jpg",
							nome: "Potere al popolo!",
						},
						{
							imagePath: "giovani_democratici.png",
							nome: "Giovani democratici",
						},
						{
							imagePath: "italia_viva.png",
							nome: "Italia Viva",
						},
						{ imagePath: "berla.jpg", nome: "Berlusconi" },
						{
							imagePath: "fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Parlamentari",
					description: "Votazione bellissima",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: false,
					result: "",
					options: [
						{
							imagePath: "fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
						{
							imagePath: "movimento5stelle.jpg",
							nome: "Movimento 5 Stelle",
						},
					],
				},
				{
					id: uuidv4(),
					title: "Regionali",
					description: "Votazione per la scelta del capo della regione",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: true,
					result: "Lega Nord",
					options: [
						{ imagePath: "lega.jpg", nome: "Lega Nord" },
						{
							imagePath: "potere_al_popolo.jpg",
							nome: "Potere al popolo!",
						},
						{
							imagePath: "cambiamo.png",
							nome: "Cambiamo!",
						},
						{
							imagePath: "italia_viva.png",
							nome: "Italia Viva",
						},
						{ imagePath: "berla.jpg", nome: "Berlusconi" },
						{
							imagePath: "fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
						{
							imagePath: "movimento5stelle.jpg",
							nome: "Movimento 5 Stelle",
						},
					],
				},
			],
			role: "",
		};
	},
	mutations: rootMutations,
	actions: rootActions,
	getters: rootGetters,
});

export default store;
