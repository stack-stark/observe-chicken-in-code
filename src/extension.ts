// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
const Chicken = require('./chicken')

export function activate(context: vscode.ExtensionContext) {

  let chicken = vscode.commands.registerCommand(
    'code.showChicken',
    () => {
      new Chicken().commandHandel()
    }
  )

  context.subscriptions.push(chicken)
}

export function deactivate() {}

