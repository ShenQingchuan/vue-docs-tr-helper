import * as vscode from 'vscode';

const nonAnchorTagValidRegExp = /[^ \-a-zA-Z0-9]/g;
function transformToAnchorTag(text: string) {
	const pickOnlyValid = text.replace(nonAnchorTagValidRegExp, '');
	return `{#${
		pickOnlyValid
			.toLowerCase()
			.split(' ')
			.filter(str => str !== '')
			.join('-')
	}}`;
}

export default function() {
	// The code you place here will be executed every time your command is executed
	// Display a message box to the user
	const textEditor = vscode.window.activeTextEditor;
	
	if (textEditor) {
		textEditor.edit((editBuilder) => {
			textEditor.selections.forEach((selection) => {
				const selectionText = textEditor.document.getText(selection);
				const anchorTagText = transformToAnchorTag(
					textEditor.document.getText(selection)
				);
				editBuilder.replace(
					selection,
					`${selectionText} ${anchorTagText}`
				);
			});
		});
	}
}