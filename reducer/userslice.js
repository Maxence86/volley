import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  participants: [
    { id: '1', name: 'Participant 1', vote: '' },
    { id: '2', name: 'Participant 2', vote: '' },
    // Ajoute les autres participants
  ],
  resetVotes: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setVote: (state, action) => {
      const { participantId, voteType } = action.payload;
      const participant = state.participants.find((p) => p.id === participantId);
      if (participant) {
        participant.vote = voteType;
      }
    },
    resetVotes: (state) => {
      state.resetVotes = true;
      state.participants.forEach((participant) => {
        participant.vote = '';
      });
    },
    cancelResetVotes: (state) => {
      state.resetVotes = false;
    },
  },
});

export const { setVote, resetVotes, cancelResetVotes } = userSlice.actions;
export default userSlice.reducer;
