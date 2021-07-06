import Vuex from "vuex";
import Vue from "vue";

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
					id: 0,
					title: "Comunali",
					description: "Votazione per la scelta del sindaco di Rubano",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: false,
					result: "",
					options: [
						{ imagePath: "./../assets/images/lega.jpg", nome: "Lega Nord" },
						{
							imagePath: "./../assets/images/potere_al_popolo.jpg",
							nome: "Potere al popolo!",
						},
						{
							imagePath: "./../assets/images/giovani_democratici.png",
							nome: "Giovani democratici",
						},
						{
							imagePath: "./../assets/images/italia_viva.png",
							nome: "Italia Viva",
						},
						{ imagePath: "./../assets/images/berla.jpg", nome: "Berlusconi" },
						{
							imagePath: "./../assets/images/fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
					],
				},
				{
					id: 1,
					title: "Regionali",
					description: "Votazione per la scelta del capo della regione",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: true,
					result: "Lega Nord",
					options: [
						{ imagePath: "./../assets/images/lega.jpg", nome: "Lega Nord" },
						{
							imagePath: "./../assets/images/potere_al_popolo.jpg",
							nome: "Potere al popolo!",
						},
						{
							imagePath: "./../assets/images/cambiamo.png",
							nome: "Cambiamo!",
						},
						{
							imagePath: "./../assets/images/italia_viva.png",
							nome: "Italia Viva",
						},
						{ imagePath: "./../assets/images/berla.jpg", nome: "Berlusconi" },
						{
							imagePath: "./../assets/images/fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
						{
							imagePath: "./../assets/images/movimento5stelle.jpg",
							nome: "Movimento 5 Stelle",
						},
					],
				},
				{
					id: 2,
					title: "Parlamentari",
					description: "Votazione bellissima",
					dateStart: new Date(),
					dateEnd: new Date(),
					voted: true,
					result: "Movimento 5 Stelle",
					options: [
						{
							imagePath: "./../assets/images/fratelli_italia.png",
							nome: "Fratelli d'Italia",
						},
						{
							imagePath: "./../assets/images/movimento5stelle.jpg",
							nome: "Movimento 5 Stelle",
						},
					],
				},
			],
		};
	},
	mutations: rootMutations,
	actions: rootActions,
	getters: rootGetters,
});

export default store;
