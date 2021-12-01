// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	anchorTag,
	anchorTagFile,
} from './commands';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const { } = context;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Vue-docs-tr-helper is now active!');

	// commands have been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposeAnchorTag = vscode.commands.registerCommand(
		'vue-docs-tr-helper.anchor-tag',
		anchorTag,
	);
	
	const disposeAnchorTagFile = vscode.commands.registerCommand(
		'vue-docs-tr-helper.anchor-tag-file',
		anchorTagFile,
	);

	context.subscriptions.push(
		disposeAnchorTag,
		disposeAnchorTagFile
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
