// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import hub from "./utils/hub";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let h91hub = vscode.commands.registerCommand('extension.h91hub', () => {
		hub(context);
	});

	context.subscriptions.push(h91hub);
}

// this method is called when your extension is deactivated
export function deactivate() {}
