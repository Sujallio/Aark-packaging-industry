import { execSync } from 'child_process';
import { mkdirSync, cpSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Check if this is ERP-only deployment (based on Vercel environment)
// Vercel sets VERCEL environment variable and VERCEL_PROJECT_PRODUCTION_URL
const isERPDeployment = process.env.VERCEL_PROJECT_PRODUCTION_URL?.includes('erp');
const isVercelBuild = !!process.env.VERCEL;

console.log('Build Configuration:');
console.log('- Is Vercel Build:', isVercelBuild);
console.log('- Is ERP Deployment:', isERPDeployment);
console.log('---');

if (isVercelBuild && isERPDeployment) {
  // Build ONLY the ERP app for the ERP-specific Vercel project
  console.log('Building ERP app only (ERP deployment)...');
  execSync('npm run build', { 
    cwd: join(__dirname, 'supabase-erp'), 
    stdio: 'inherit' 
  });

  // Copy ERP dist to root dist
  const erpDistPath = join(__dirname, 'supabase-erp', 'dist');
  const outputPath = join(__dirname, 'dist');

  try {
    // Remove old dist if exists
    try {
      rmSync(outputPath, { recursive: true });
    } catch (e) {
      // Directory might not exist
    }
    
    // Copy ERP dist to output
    mkdirSync(outputPath, { recursive: true });
    cpSync(erpDistPath, outputPath, { recursive: true });
    console.log('✓ ERP app ready at dist/');
  } catch (error) {
    console.error('Error preparing ERP distribution:', error);
    process.exit(1);
  }
} else {
  // Build BOTH apps combined for local/main deployment
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
}

console.log('✓ Build complete!');
