export default {
	setRuolo(context, role) {
		context.commit("setRuolo", role);
	},
	changeVotation(context, result, votation) {
		context.commit("changeVotation", result, votation);
	},
};
