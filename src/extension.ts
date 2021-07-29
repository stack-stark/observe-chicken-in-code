// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const Chicken = require('./chicken');
const AddFund = require('./addFund');
const generateFile = require('./generateFile');

export function activate(context: vscode.ExtensionContext) {

  /**
   * 生成
   */
  let schicken = vscode.commands.registerCommand(
    'code.showChicken',
    () => {
      new generateFile().commandHandel();
    }
  );
  
  /**
   * 添加配置
   */
  let achicken = vscode.commands.registerCommand(
    'code.addChicken',
    () => {
      new AddFund().commandHandel();
    }
  )

  context.subscriptions.push(schicken);
  context.subscriptions.push(achicken);
}

export function deactivate() {}

