import * as vscode from "vscode";
import { AddFund } from "./addFund";
import { CreateFundFile } from "./createFundFile";
import { getDataByCode } from "./services";

export function activate(context: vscode.ExtensionContext) {
  try {
    console.log('Extension "码上看鸡" is now active!');
    // 示例：注册一个命令，用户可以通过命令面板调用
    let disposable = vscode.commands.registerCommand("code.addChicken", () => {
      const addFund = new AddFund();
      addFund.commandHandel();
    });
    context.subscriptions.push(disposable);

    let createFundFileCommand = vscode.commands.registerCommand(
      "code.showChicken",
      () => {
        const createFundFile = new CreateFundFile();
        createFundFile.commandHandel();
      }
    );

    context.subscriptions.push(createFundFileCommand);
  } catch (error) {
    // 异常处理: 打印错误日志
    console.error(`Error while activating extension "码上看鸡": ${error}`);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
