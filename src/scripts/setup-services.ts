import { config } from 'dotenv';
import { resolve } from 'path';
import { services } from '@/data/services';
import { insertServices } from '@/lib/supabase';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Log environment variables
console.log('Environment variables:', {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '***' : undefined,
});

async function setupServices() {
  try {
    console.log('Starting services setup...');
    
    // Insert services
    const result = await insertServices(services);
    console.log('Successfully inserted services:', result);
    
    console.log('Services setup completed successfully!');
  } catch (error) {
    console.error('Failed to setup services:', error);
    process.exit(1);
  }
}

setupServices(); 