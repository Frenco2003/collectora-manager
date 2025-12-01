export interface AuthState {
  user: {
    email: string;
  } | null;
  error: string;
  loading: boolean;
  success: boolean;
}
