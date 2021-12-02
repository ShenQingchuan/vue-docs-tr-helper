// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	registerAllCommands,
} from './commands';
import { registerAllHovers } from './hovers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Vue documentation traslation helper is now active!');

	context.subscriptions.push(
		...registerAllCommands(),
		...registerAllHovers(),
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
