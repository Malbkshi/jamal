import { createClient } from '@supabase/supabase-js';
import { Service } from '@/data/services';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

// Create admin client for setup operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Create regular client for normal operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function insertServices(services: Service[]) {
  try {
    // First, delete all existing services
    const { error: deleteError } = await supabaseAdmin
      .from('services')
      .delete()
      .neq('id', 'dummy');

    if (deleteError) {
      console.error('Error deleting existing services:', deleteError);
      throw deleteError;
    }

    // Then insert the new services
    const { data, error } = await supabaseAdmin
      .from('services')
      .insert(services)
      .select();

    if (error) {
      console.error('Error inserting services:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in insertServices:', error);
    throw error;
  }
}

export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getServices:', error);
    throw error;
  }
} 