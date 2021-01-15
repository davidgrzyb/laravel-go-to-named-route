// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let hover = vscode.languages.registerHoverProvider('php', {
		provideHover(document, position, token) {
			let regex = new RegExp(`route\(([^\)]+)\)`);
			let range = document.getWordRangeAtPosition(position, regex);

			if (! range) return

			let word = document.getText(range).substring(7, document.getText(range).length - 1);

			return new vscode.Hover({
				language: "Hello language",
				value: word
			});
		}
	});

	let disposable = vscode.commands.registerCommand('laravel-go-to-named-route.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from Laravel Go To Named Route!');
	});

	context.subscriptions.push(hover, disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
