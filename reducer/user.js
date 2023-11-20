import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
  participants: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setVote: (state, action) => {
      const { participantId, voteType } = action.payload;
      const participant = state.participants.find((p) => p.id === participantId);
      if (participant) {
        participant.vote = voteType;
        saveParticipants(state.participants);
      }
    },
    resetVotes: (state) => {
      state.participants.forEach((participant) => {
        participant.vote = '';
      });
      saveParticipants(state.participants);
    },
    cancelResetVotes: (state) => {},
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
      saveParticipants(state.participants);
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter((p) => p.id !== action.payload);
      saveParticipants(state.participants);
    },
  },
});

const saveParticipants = async (participants) => {
  try {
    await AsyncStorage.setItem('participants', JSON.stringify(participants));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des participants :', error);
  }
};

export const { setParticipants, setVote, resetVotes, cancelResetVotes, addParticipant, removeParticipant } = userSlice.actions;
export default userSlice.reducer;
