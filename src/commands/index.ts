import {
  anchorTag,
  anchorTagFile,
} from "./anchorTag";
import * as vscode from 'vscode';

// commands have been defined in the package.json file
// Now provide the implementation of the command with registerCommand
// The commandId parameter must match the command field in package.json
export function registerAllCommands() {
  const disposeAnchorTag = vscode.commands.registerCommand(
		'vue-docs-tr-helper.anchor-tag',
		anchorTag,
	);
	
	const disposeAnchorTagFile = vscode.commands.registerCommand(
		'vue-docs-tr-helper.anchor-tag-file',
		anchorTagFile,
	);

  return [
    disposeAnchorTag,
    disposeAnchorTagFile,
  ];
};
