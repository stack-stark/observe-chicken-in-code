import * as vscode from "vscode";
import { window } from "vscode";
import { createJsFileTemplate } from "./utils/jsTemplate";

class MyContentProvider implements vscode.TextDocumentContentProvider {
  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    const chickenArray: Array<string> =
      vscode.workspace.getConfiguration().get("stack.chickenArray") || [];
    return await createJsFileTemplate(chickenArray);
  }
}

export class CreateFundFile {
  constructor() {}

  async commandHandel() {
    const provider = new MyContentProvider();
    vscode.workspace.registerTextDocumentContentProvider(
      "fund-virtual-scheme",
      provider
    );
    const uri = vscode.Uri.parse(
      "fund-virtual-scheme:fundFile/readOnlyFund.js"
    );
    vscode.window.showTextDocument(uri);
  }
}
