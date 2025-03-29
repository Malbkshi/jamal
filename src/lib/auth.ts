import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export async function isAdmin() {
  const { user, error } = await getCurrentUser();
  if (error || !user) return false;
  
  const { data, error: roleError } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single();
    
  if (roleError || !data) return false;
  return data.role === 'admin';
} 