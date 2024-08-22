#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

// The URL of your GitHub repo
const repoUrl = 'https://github.com/ajoshi3010/url-shortener.git';

// Cloning the repository
const folderName = process.argv[2] || 'my-next-app';
const repoCloneCommand = `git clone ${repoUrl} ${folderName}`;

console.log(`Cloning repository into ${folderName}...`);
execSync(repoCloneCommand, { stdio: 'inherit' });

// Navigate to the folder
console.log('Installing dependencies...');
execSync(`cd ${folderName} && npm install`, { stdio: 'inherit' });

console.log('Setup complete! Run `npm run dev` to start the app.');
