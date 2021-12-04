import * as vscode from 'vscode';
import * as https from 'https';

const sourceCaches = new Map<string, string[]>();
const lineSeperator = /\r?\n/;
const hoverTitle = '**English source:** \n\n';

function getRawContentSource(url: string) {
  return new Promise<string>((resolve, reject) => {
    let rawBuffer = '';
    https.get(url, (res) => {
      res.on('data', (data) => {
        rawBuffer += String(data);
      });
      res.on('end', () => {
        resolve(rawBuffer);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

export const registerHoverSource = () => vscode.languages.registerHoverProvider('markdown', {
  provideHover: async (document, position) => {
    try {
      const repoName = vscode.workspace.getConfiguration().get('vue-docs-tr-helper.github-repo-name');
      const branch = vscode.workspace.getConfiguration().get('vue-docs-tr-helper.github-repo-branch');

      const filePathUnits = document.fileName.split('/');
      const relativePath = filePathUnits
        .slice(filePathUnits.indexOf('src'))
        .join('/');

      const rawContentUrl = `https://raw.githubusercontent.com/${repoName}/${branch}/${relativePath}`;
      
      const alreadyCached = sourceCaches.get(relativePath);
      let lineSource = '';
      if (!alreadyCached) {
        const rawSource: string = await getRawContentSource(rawContentUrl);
        const allLines = rawSource.split(lineSeperator);
        sourceCaches.set(relativePath, allLines);
        if (position.line >= allLines.length) {
          return;
        }
        lineSource = allLines[position.line];
      } else {
        if (position.line >= alreadyCached.length) {
          return;
        }
        lineSource = alreadyCached[position.line];
      }
      return new vscode.Hover(
        new vscode.MarkdownString(hoverTitle).appendText(lineSource),
      );
    } catch (err) {
      vscode.window.showErrorMessage('Fetch source failed: ' + err);
      return;
    }
  },
});
