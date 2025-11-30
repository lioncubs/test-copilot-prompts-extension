import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Enterprise Copilot Prompts extension is now active');

    // Register commands
    const initializeCommand = vscode.commands.registerCommand(
        'enterpriseCopilotPrompts.initialize',
        () => initializeEnterpriseFiles(context)
    );

    const updateCommand = vscode.commands.registerCommand(
        'enterpriseCopilotPrompts.updatePrompts',
        () => updatePromptFiles(context)
    );

    const showListCommand = vscode.commands.registerCommand(
        'enterpriseCopilotPrompts.showPromptList',
        () => showAvailablePrompts(context)
    );

    // MCP integration: Run Code-Review Prompt command
    const runCodeReviewCommand = vscode.commands.registerCommand(
        'enterpriseCopilotPrompts.runCodeReview',
        () => runCodeReviewPrompt(context)
    );

    context.subscriptions.push(initializeCommand, updateCommand, showListCommand, runCodeReviewCommand);

    // Check for auto-update on activation
    const config = vscode.workspace.getConfiguration('enterpriseCopilotPrompts');
    if (config.get<boolean>('autoUpdate')) {
        updatePromptFiles(context);
    }

    // Dynamic handling for .github/copilot-instructions.md when repository is loaded
    loadCopilotInstructions(context);
}

async function initializeEnterpriseFiles(context: vscode.ExtensionContext): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
        return;
    }

    const templatesPath = path.join(context.extensionPath, 'templates');
    const targetPath = workspaceFolder.uri.fsPath;

    try {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Initializing Enterprise Copilot Files',
                cancellable: false
            },
            async (progress) => {
                progress.report({ increment: 0, message: 'Copying template files...' });

                await copyTemplateFiles(templatesPath, targetPath, progress);

                progress.report({ increment: 100, message: 'Complete!' });
            }
        );

        vscode.window.showInformationMessage(
            'Enterprise Copilot files initialized successfully!',
            'Open Prompts Folder'
        ).then(selection => {
            if (selection === 'Open Prompts Folder') {
                const promptsUri = vscode.Uri.file(path.join(targetPath, '.github', 'prompts'));
                vscode.commands.executeCommand('revealInExplorer', promptsUri);
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to initialize files: ${error}`);
    }
}

async function updatePromptFiles(context: vscode.ExtensionContext): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        return;
    }

    const templatesPath = path.join(context.extensionPath, 'templates');
    const targetPath = workspaceFolder.uri.fsPath;
    const githubPath = path.join(targetPath, '.github');

    // Only update if .github folder already exists (already initialized)
    if (!fs.existsSync(githubPath)) {
        return;
    }

    try {
        await copyTemplateFiles(templatesPath, targetPath);
        vscode.window.showInformationMessage('Enterprise Copilot prompts updated.');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to update prompts: ${error}`);
    }
}

async function showAvailablePrompts(context: vscode.ExtensionContext): Promise<void> {
    const templatesPath = path.join(context.extensionPath, 'templates', '.github', 'prompts');
    
    if (!fs.existsSync(templatesPath)) {
        vscode.window.showInformationMessage('No prompt templates available.');
        return;
    }

    const promptFiles = fs.readdirSync(templatesPath)
        .filter(file => file.endsWith('.prompt.md'));

    if (promptFiles.length === 0) {
        vscode.window.showInformationMessage('No prompt templates available.');
        return;
    }

    const items: vscode.QuickPickItem[] = promptFiles.map(file => ({
        label: file.replace('.prompt.md', ''),
        description: file,
        detail: `Template prompt file: ${file}`
    }));

    const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Available Enterprise Prompts',
        title: 'Enterprise Copilot Prompts'
    });

    if (selected) {
        const filePath = path.join(templatesPath, selected.description!);
        const doc = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(doc, { preview: true });
    }
}

async function copyTemplateFiles(
    sourcePath: string,
    targetPath: string,
    progress?: vscode.Progress<{ increment?: number; message?: string }>
): Promise<void> {
    if (!fs.existsSync(sourcePath)) {
        throw new Error('Template files not found in extension.');
    }

    // Copy directory structure recursively
    const overwriteState = { mode: 'ask' as 'ask' | 'yes-all' | 'no-all' };
    await copyDirectoryRecursive(sourcePath, targetPath, overwriteState, progress);
}

async function copyDirectoryRecursive(
    source: string,
    target: string,
    overwriteState: { mode: 'ask' | 'yes-all' | 'no-all' },
    progress?: vscode.Progress<{ increment?: number; message?: string }>,
    incrementPerFile: number = 10
): Promise<void> {
    if (!fs.existsSync(source)) {
        return;
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });
    
    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const targetPath = path.join(target, entry.name);

        if (entry.isDirectory()) {
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath, { recursive: true });
            }
            await copyDirectoryRecursive(sourcePath, targetPath, overwriteState, progress, incrementPerFile);
        } else {
            // Check if file exists and prompt for overwrite
            if (fs.existsSync(targetPath)) {
                if (overwriteState.mode === 'no-all') {
                    continue;
                }
                
                if (overwriteState.mode === 'ask') {
                    const overwrite = await vscode.window.showQuickPick(
                        ['Yes', 'No', 'Yes to All', 'No to All'],
                        { placeHolder: `File ${entry.name} exists. Overwrite?` }
                    );
                    
                    if (overwrite === 'No') {
                        continue;
                    }
                    if (overwrite === 'No to All') {
                        overwriteState.mode = 'no-all';
                        continue;
                    }
                    if (overwrite === 'Yes to All') {
                        overwriteState.mode = 'yes-all';
                    }
                    // 'Yes' falls through to copy
                }
            }

            // Ensure parent directory exists
            const parentDir = path.dirname(targetPath);
            if (!fs.existsSync(parentDir)) {
                fs.mkdirSync(parentDir, { recursive: true });
            }

            fs.copyFileSync(sourcePath, targetPath);
            progress?.report({ increment: incrementPerFile, message: `Copied ${entry.name}` });
        }
    }
}

async function runCodeReviewPrompt(context: vscode.ExtensionContext): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open. Please open a folder first.');
        return;
    }

    // Check for the test code-review prompt in extension's .github/prompts or workspace
    const extensionPromptPath = path.join(context.extensionPath, '.github', 'prompts', 'test-code-review.prompt.md');
    const workspacePromptPath = path.join(workspaceFolder.uri.fsPath, '.github', 'prompts', 'test-code-review.prompt.md');

    let promptPath: string | undefined;
    if (fs.existsSync(workspacePromptPath)) {
        promptPath = workspacePromptPath;
    } else if (fs.existsSync(extensionPromptPath)) {
        promptPath = extensionPromptPath;
    }

    if (!promptPath) {
        vscode.window.showErrorMessage('Code-review prompt not found. Please initialize enterprise files first.');
        return;
    }

    try {
        const promptContent = fs.readFileSync(promptPath, 'utf-8');
        const doc = await vscode.workspace.openTextDocument({
            content: promptContent,
            language: 'markdown'
        });
        await vscode.window.showTextDocument(doc, { preview: true });
        vscode.window.showInformationMessage('Code-Review Prompt loaded. Use this prompt with GitHub Copilot for code reviews.');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to load code-review prompt: ${error}`);
    }
}

function loadCopilotInstructions(context: vscode.ExtensionContext): void {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        return;
    }

    const instructionsPath = path.join(workspaceFolder.uri.fsPath, '.github', 'copilot-instructions.md');
    
    if (fs.existsSync(instructionsPath)) {
        console.log('Copilot instructions found at:', instructionsPath);
        // Store the path for MCP context handling
        context.workspaceState.update('copilotInstructionsPath', instructionsPath);
    } else {
        // Check extension's template for fallback
        const templateInstructionsPath = path.join(context.extensionPath, 'templates', '.github', 'copilot-instructions.md');
        if (fs.existsSync(templateInstructionsPath)) {
            console.log('Using template copilot instructions from:', templateInstructionsPath);
            context.workspaceState.update('copilotInstructionsPath', templateInstructionsPath);
        }
    }
}

export function deactivate() {
    // Clean up resources if needed
}
