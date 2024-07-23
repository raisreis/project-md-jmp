// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const fs = require('fs');
const readline = require('readline');

const idx = new Map();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "md-jmp" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('md-jmp.helloWorld', () => {
		const re = /^@key:\[([0-9]{12})\]$/g;

		// fine all markdown files in project
		vscode.workspace.findFiles("**/*.md*", ).then((x) => {
			x.forEach(f => {

				const rl = readline.createInterface({
					input: fs.createReadStream(f.path), crlfDelay: Infinity
				});
				rl.on('line', (line: any) => {
					// const match = line.match(re)
					const xs = line.matchAll(re);
					const match = re.exec(line);
					if (match !== null && match !== undefined) {
						idx.set(match[1], f.path);
						console.log("match: ", match);
						console.log("idx: ", idx);
					}
				})
			})
		});


		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders) {
			const rootPath = workspaceFolders[0].uri;
	  	const op = vscode.Uri.parse(rootPath + "/stuff.md");
	  	vscode.workspace.openTextDocument(op).then(doc => {
				console.log("opening ...");
	  		vscode.window.showTextDocument(doc);
	  	})
		}


		vscode.window.showInformationMessage('Hello World from md-jmp!');
	});

	context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
