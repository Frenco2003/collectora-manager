import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Tipizzazione dello stato
interface AuthState {
  user: { email: string } | null;
  error: string | null; // Errori ora possono essere nulli
  loading: boolean;
  success: string | null;
}

// Stato iniziale
const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  success: null
};

// Creazione dello slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Azioni per il login
    loginRequest(state) {
      state.loading = true; // Avvia il loading quando inizia il login
      state.error = null; // Pulisci eventuali errori precedenti
    },
    loginSuccess(state, action: PayloadAction<{ email: string }>) {
      state.loading = false; // Disabilita il loading al termine
      state.user = action.payload; // Imposta l'utente dopo un login riuscito
      state.error = null; // Rimuovi gli errori
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false; // Disabilita il loading al termine
      state.error = action.payload; // Imposta l'errore
    },

    // Azioni per il logout
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false; // Disabilita il loading
    },

    // Azioni per la registrazione
    signupRequest(state) {
      state.loading = true; // Avvia il loading durante la registrazione
      state.error = null; // Pulisci gli errori
    },
    signupSuccess(state, action: PayloadAction<{ email: string }>) {
      state.loading = false; // Disabilita il loading al termine
      state.user = action.payload; // Imposta l'utente dopo una registrazione riuscita
      state.error = null; // Rimuovi gli errori
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false; // Disabilita il loading al termine
      state.error = action.payload; // Imposta l'errore
    },

    // Azione per impostare manualmente l'errore
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload; // Imposta un errore personalizzato
    },
  },
});

// Esporta le azioni dal slice
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signupRequest,
  signupSuccess,
  signupFailure,
  setError,
} = authSlice.actions;

// Esporta il reducer creato dal slice (è questo che deve essere passato al configureStore)
export default authSlice.reducer;
