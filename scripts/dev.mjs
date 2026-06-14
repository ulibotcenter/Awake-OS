#!/usr/bin/env node
/**
 * Starts Next.js dev server cleanly:
 * - removes stale .next/dev/lock
 * - frees port 3000 if occupied by a zombie process
 */
import { existsSync, rmSync } from 'fs';
import { spawn } from 'child_process';
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = join(fileURLToPath(new URL('..', import.meta.url)));
const lockPath = join(projectRoot, '.next/dev/lock');

if (existsSync(lockPath)) {
  try {
    rmSync(lockPath);
    console.log('Removed stale dev lock.');
  } catch {
    // ignore
  }
}

try {
  const pids = execSync('lsof -ti:3000 2>/dev/null || true', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
  for (const pid of pids) {
    try {
      process.kill(Number(pid), 'SIGKILL');
      console.log(`Freed port 3000 (pid ${pid}).`);
    } catch {
      // ignore
    }
  }
} catch {
  // ignore
}

// Use real filesystem path (fileURLToPath handles spaces in "Grok Build" correctly)
const nextBin = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

const child = spawn(process.execPath, [nextBin, 'dev'], {
  stdio: 'inherit',
  cwd: projectRoot,
});

child.on('error', (err) => {
  console.error('Failed to start Next.js dev server:', err.message);
  process.exit(1);
});

child.on('exit', (code) => process.exit(code ?? 0));