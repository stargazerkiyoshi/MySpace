#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';

const action = process.argv[2] ?? 'up';

const supportedActions = new Map([
  ['up', ['up', '-d']],
  ['down', ['down']],
  ['restart', []],
  ['logs', ['logs', '-f']],
  ['ps', ['ps']],
]);

if (!supportedActions.has(action)) {
  console.error(`Unsupported infra action: ${action}`);
  console.error(`Use one of: ${Array.from(supportedActions.keys()).join(', ')}`);
  process.exit(1);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.error) {
    console.error(
      'Failed to run Docker. Make sure Docker Desktop is installed and running.',
    );
    console.error(result.error.message);
    process.exit(1);
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

function runQuiet(command, args) {
  return spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
}

function getDockerDesktopPath() {
  const candidates = [
    `${process.env['ProgramFiles']}\\Docker\\Docker\\Docker Desktop.exe`,
    `${process.env['ProgramFiles(x86)']}\\Docker\\Docker\\Docker Desktop.exe`,
    `${process.env.LOCALAPPDATA}\\Docker\\Docker\\Docker Desktop.exe`,
  ].filter(Boolean);

  return candidates.find((filePath) => existsSync(filePath));
}

function startDockerDesktop() {
  if (process.platform !== 'win32') {
    return false;
  }

  const desktopPath = getDockerDesktopPath();
  if (!desktopPath) {
    return false;
  }

  const child = spawn(desktopPath, [], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });
  child.unref();
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDockerDaemon() {
  run('docker', ['compose', 'version']);

  const dockerInfo = runQuiet('docker', ['info']);
  if (dockerInfo.status === 0) {
    return;
  }

  const started = startDockerDesktop();
  if (!started) {
    console.error('Docker daemon is not running.');
    console.error('Start Docker Desktop, then rerun the command.');
    process.exit(1);
  }

  console.log('Docker Desktop is starting. Waiting for the daemon to become ready...');

  for (let attempt = 0; attempt < 24; attempt += 1) {
    await sleep(5000);
    const retry = runQuiet('docker', ['info']);
    if (retry.status === 0) {
      console.log('Docker daemon is ready.');
      return;
    }
  }

  console.error('Docker Desktop was launched, but the daemon did not become ready in time.');
  console.error('Wait for Docker Desktop to finish starting, then rerun the command.');
  process.exit(1);
}

await ensureDockerDaemon();

if (action === 'restart') {
  run('docker', ['compose', 'down']);
  run('docker', ['compose', 'up', '-d']);
  process.exit(0);
}

run('docker', ['compose', ...supportedActions.get(action)]);
