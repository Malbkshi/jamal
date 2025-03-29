const { execSync } = require('child_process');
const fs = require('fs');

// Read the .env.local file
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

// Set environment variables and run the setup script
try {
  const command = `npx cross-env NEXT_PUBLIC_SUPABASE_URL="${envVars.NEXT_PUBLIC_SUPABASE_URL}" SUPABASE_SERVICE_ROLE_KEY="${envVars.SUPABASE_SERVICE_ROLE_KEY}" npx tsx src/scripts/setup-services.ts`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to run setup:', error);
  process.exit(1);
} 