export default {
	setRuolo(context, role) {
		context.commit("setRuolo", role);
	},
	changeVotation(context, result, votation) {
		context.commit("changeVotation", result, votation);
	},
	deleteVotation(context, votation) {
		context.commit("deleteVotation", votation);
	},
	modifyVotation(context, votationModified) {
		context.commit("modifyVotation", votationModified);
	},
};
