import * as vscode from 'vscode';

const invalidAnchorTagCharRegExp = /[^ \-a-zA-Z0-9]/g;
const htmlTagRegExp = /[^`]<.+\s\/>[^`]/g;
const markdownHeadingRegExp = /^#{1,}\s/;
const anchorTagRegExp = /\{#[a-zA-Z0-9\-]+\}/g;

function transformToAnchorTag(text: string): string {
	const matchedExistedTag = text.match(anchorTagRegExp);
	if (matchedExistedTag && matchedExistedTag.length > 0) {
		return '';
	}
	const removedHtmlTag = text.replace(htmlTagRegExp, '');
	const keepOnlyValid = removedHtmlTag.replace(invalidAnchorTagCharRegExp, '');
	return ` {#${
		keepOnlyValid
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
			if (textEditor.selection.isEmpty) {
				const currentLine = textEditor.document.lineAt(textEditor.selection.start);
				const anchorTagText = transformToAnchorTag(currentLine.text);
				editBuilder.replace(
					currentLine.range,
					`${currentLine.text}${anchorTagText}`
				);
			} else {
				textEditor.selections.forEach((selection) => {
					const selectionText = textEditor.document.getText(selection);
					const anchorTagText = transformToAnchorTag(
						textEditor.document.getText(selection)
					);
					editBuilder.replace(
						selection,
						`${selectionText}${anchorTagText}`
					);
				});
			}
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
