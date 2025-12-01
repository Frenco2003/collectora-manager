// /* eslint-disable react-refresh/only-export-components */
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from 'react';
// import type { User } from '@supabase/supabase-js';
// import { supabase } from '../lib/subabase';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, fullName: string) => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Tipo minimo per la tabella user_profiles
// interface UserProfile {
//   id: string;
// }

// async function logAuthEvent(
//   userId: string | null,
//   email: string,
//   eventType:
//     | 'login_success'
//     | 'login_failure'
//     | 'logout'
//     | 'account_lockout'
//     | 'registration',
//   metadata?: Record<string, unknown>
// ): Promise<void> {
//   try {
//     await supabase.from('auth_logs').insert({
//       user_id: userId,
//       email,
//       event_type: eventType,
//       ip_address: null,
//       metadata: metadata ?? null,
//     });
//   } catch (error: unknown) {
//     console.error('Failed to log auth event:', error);
//   }
// }

// async function checkAccountLockout(userId: string): Promise<boolean> {
//   try {
//     const { data } = await supabase
//       .from('account_lockouts')
//       .select('locked_until')
//       .eq('user_id', userId)
//       .maybeSingle<{ locked_until: string }>();

//     if (data && new Date(data.locked_until) > new Date()) {
//       return true;
//     }
//     return false;
//   } catch (error: unknown) {
//     console.error('Failed to check lockout:', error);
//     return false;
//   }
// }

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const signIn = async (email: string, password: string): Promise<void> => {
//     try {
//       // Utente corrente (se esiste) per controllo lockout
//       const { data: currentUserData } = await supabase.auth.getUser();
//       const currentUserId = currentUserData.user?.id ?? null;

//       let userId: string | null = null;

//       if (currentUserId) {
//         const {
//           data: existingUser,
//           error: existingUserError,
//         } = await supabase
//           .from('user_profiles')
//           .select('id')
//           .eq('id', currentUserId)
//           .maybeSingle<UserProfile>();

//         if (existingUserError) {
//           throw existingUserError;
//         }

//         userId = existingUser?.id ?? null;
//       }

//       if (userId) {
//         const isLocked = await checkAccountLockout(userId);
//         if (isLocked) {
//           await logAuthEvent(userId, email, 'login_failure', {
//             reason: 'account_locked',
//           });
//           throw new Error(
//             'Account locked due to too many failed attempts. Please try again later.'
//           );
//         }
//       }

//       const {
//         data: authData,
//         error: authError,
//       } = await supabase.auth.signInWithPassword({ email, password });

//       const loggedUser = authData?.user ?? null;

//       if (authError) {
//         if (loggedUser?.id) {
//           await supabase.rpc('record_failed_login', {
//             p_user_id: loggedUser.id,
//             p_email: email,
//           });
//         } else {
//           await logAuthEvent(null, email, 'login_failure', {
//             reason: authError.message,
//           });
//         }
//         throw authError;
//       }

//       if (loggedUser) {
//         await supabase.rpc('clear_failed_attempts', {
//           p_user_id: loggedUser.id,
//         });
//         await logAuthEvent(loggedUser.id, email, 'login_success');
//         setUser(loggedUser);
//       }
//     } catch (error: unknown) {
//       console.error('Error during signIn:', error);
//       throw error;
//     }
//   };

//   const signUp = async (
//     email: string,
//     password: string,
//     fullName: string
//   ): Promise<void> => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName,
//         },
//       },
//     });

//     if (error) {
//       await logAuthEvent(null, email, 'registration', {
//         success: false,
//         error: error.message,
//       });
//       throw error;
//     }

//     if (data.user) {
//       await supabase.from('user_profiles').insert({
//         id: data.user.id,
//         full_name: fullName,
//         gdpr_consent: true,
//         gdpr_consent_date: new Date().toISOString(),
//       });

//       await logAuthEvent(data.user.id, email, 'registration', {
//         success: true,
//       });

//       setUser(data.user);
//     }
//   };

//   const signOut = async (): Promise<void> => {
//     if (user) {
//       await logAuthEvent(user.id, user.email ?? '', 'logout');
//     }
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
