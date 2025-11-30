import * as fs from 'fs';
import * as path from 'path';

/**
 * Installation script to copy .github/prompts/ and .github/agents/ files
 * into local-assets/ for standalone use even if the extension is uninstalled.
 */

const LOCAL_ASSETS_DIR = 'local-assets';
const SOURCE_DIRS = ['.github/prompts', '.github/agents'];

function copyDirectoryRecursive(source: string, target: string): void {
    if (!fs.existsSync(source)) {
        console.log(`Source directory not found: ${source}`);
        return;
    }

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });
    
    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);

        if (entry.isDirectory()) {
            copyDirectoryRecursive(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied: ${sourcePath} -> ${targetPath}`);
        }
    }
}

export function installPrompts(basePath: string = process.cwd()): void {
    const localAssetsPath = path.join(basePath, LOCAL_ASSETS_DIR);

    console.log('Installing prompts and agents to local-assets/...');

    for (const sourceDir of SOURCE_DIRS) {
        const sourcePath = path.join(basePath, sourceDir);
        const targetDir = path.basename(sourceDir); // 'prompts' or 'agents'
        const targetPath = path.join(localAssetsPath, targetDir);

        console.log(`Copying ${sourceDir} to ${LOCAL_ASSETS_DIR}/${targetDir}...`);
        copyDirectoryRecursive(sourcePath, targetPath);
    }

    console.log('Installation complete. Files are available in local-assets/');
}

// Run if executed directly
if (require.main === module) {
    installPrompts();
}
