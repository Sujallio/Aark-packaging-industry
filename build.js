import { execSync } from 'child_process';
import { mkdirSync, cpSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Building main app...');
execSync('vite build', { cwd: __dirname, stdio: 'inherit' });

console.log('Building ERP app...');
execSync('npm run build', { 
  cwd: join(__dirname, 'supabase-erp'), 
  stdio: 'inherit' 
});

console.log('Combining distributions...');
const erpDistPath = join(__dirname, 'supabase-erp', 'dist');
const mainDistPath = join(__dirname, 'dist');
const erpOutputPath = join(mainDistPath, 'erp');

try {
  mkdirSync(erpOutputPath, { recursive: true });
  cpSync(erpDistPath, erpOutputPath, { recursive: true });
  console.log('✓ ERP app copied to dist/erp/');
} catch (error) {
  console.error('Error combining distributions:', error);
  process.exit(1);
}

console.log('✓ Build complete!');
