export default {
	setRuolo(state, payload) {
		state.role = payload.role;
	},
	changeVotation(state, payload) {
		let voteToChange = state.votations.find(
			(vote) => vote === payload.votation
		);
		voteToChange.voted = true;
		voteToChange.result = payload.result;
	},
	deleteVotation(state, payload) {
		state.votations = state.votations.filter(
			(votation) => votation !== payload.votation
		);
	},
	modifyVotation(state, payload) {
		let voteToChange = state.votations.find(
			(vote) => vote.id === payload.votationModified.id
		);
		const ind = state.votations.indexOf(voteToChange);
		state.votations.splice(ind, 1, payload.votationModified);
	},
};
