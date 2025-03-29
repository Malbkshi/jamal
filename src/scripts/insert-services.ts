import { services } from '@/data/services';
import { insertServices } from '@/lib/supabase';

async function main() {
  try {
    console.log('Starting to insert services...');
    const result = await insertServices(services);
    console.log('Successfully inserted services:', result);
  } catch (error) {
    console.error('Failed to insert services:', error);
  }
}

main(); 