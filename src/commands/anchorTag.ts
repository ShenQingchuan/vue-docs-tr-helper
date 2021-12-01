import * as vscode from 'vscode';

const nonAnchorTagValidRegExp = /[^ \-a-zA-Z0-9]/g;
const markdownHeadingRegExp = /^#{1,}\s/;

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

/**
 * Replace selections' text to a valid anchor-tag form.
 * 
 * - Before: `### Functions definition"`
 * - After: `### Functoins definition {#functions-definition}`
 */
export const anchorTag = () => {
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
};

/**
 * Replace all headings' text to valid anchor-tag form in a markdown file.
 */
export const anchorTagFile = async () => {
	const textEditor = vscode.window.activeTextEditor;
	if (!textEditor) {
		return;
	}

	const doc = textEditor.document;
	for (let i = 0; i < doc.lineCount; i++) {
		const line = doc.lineAt(i);
		const lineText = line.text;
		if (markdownHeadingRegExp.test(line.text)) {
			const anchorTagText = transformToAnchorTag(lineText);
			await textEditor.edit((editBuilder) => {
				editBuilder.replace(
					line.range,
					`${lineText} ${anchorTagText}`
				);
			}, { // makes this edit as one batched step
				undoStopBefore: i === 0,
				undoStopAfter: i === doc.lineCount - 1
			});
		}
	}
};
