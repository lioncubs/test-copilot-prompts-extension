import * as fs from 'fs';
import * as path from 'path';

/**
 * Uninstallation script to clear MCP-specific files while preserving
 * local directories for manual execution.
 */

const LOCAL_ASSETS_DIR = 'local-assets';
const MCP_DIRS = ['.github/prompts', '.github/agents'];

function removeDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory not found, skipping: ${dirPath}`);
        return;
    }

    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Removed directory: ${dirPath}`);
}

export function uninstallPrompts(basePath: string = process.cwd(), preserveLocalAssets: boolean = true): void {
    console.log('Uninstalling MCP-specific files...');

    for (const mcpDir of MCP_DIRS) {
        const dirPath = path.join(basePath, mcpDir);
        console.log(`Removing ${mcpDir}...`);
        removeDirectory(dirPath);
    }

    if (preserveLocalAssets) {
        const localAssetsPath = path.join(basePath, LOCAL_ASSETS_DIR);
        if (fs.existsSync(localAssetsPath)) {
            console.log(`Preserving local-assets/ directory for manual use.`);
        }
    }

    console.log('Uninstallation complete. MCP-specific files removed.');
}

// Run if executed directly
if (require.main === module) {
    uninstallPrompts();
}
