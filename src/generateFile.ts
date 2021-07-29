/*
   o                 /' )
                   /'   (                          ,
               __/'     )                        .' `;
o      _.-~~~~'          ``---..__             .'   ;
 _.--'  b)  stack-stark           ``--...____.'   .'
(     _.      )).      `-._    2021.6.18         <
 `\|\|\|\|)-.....___.-     `-.         __...--'-.'.
   `---......____...---`.___.'----... .'         `.;
                                    `-`           `*/
import * as vscode from 'vscode'
import { FileTypeList } from './data/fileTypeData'
import { generateContent } from './templates/main';
class generateFile {
  constructor(private workspaceRoot: string) {}

  async commandHandel() {
    this.writeFileRun();
  }

  /**
   * 询问接收文件名
   */
  private async getFileName(): Promise<string> {
    const result: string | undefined = await vscode.window.showInputBox({
      prompt: '请输入文件名:',
      placeHolder: '文件名:',
    })
    return result || 'additional'
  }

  /**
   * 生成随机文件名
   * @returns
   */
  private randomFileName(): string {
    const nameArray = [
      'filereWrite',
      'showInputBox',
      'yarnContent',
      'workspaceRoot',
      'randomFileName',
      'getFileName',
      'noUnusedParameters',
      'additional',
      'unused',
      'extension',
    ]
    const r = Math.floor(Math.random() * 10)
    return nameArray[r]
  }

  /**
   * 写入文件调用方法
   */
  private async writeFileRun() {
    let fileType: string =
      vscode.workspace.getConfiguration().get('stack.chickenFileType') ||
      'JavaScript';
    const quiet: boolean | undefined =
      vscode.workspace.getConfiguration().get('stack.chickenQuiet') || true;
    const name = quiet ? this.randomFileName() : await this.getFileName();
    if(!FileTypeList.includes(fileType)) {
      fileType = 'JavaScript';
    }
    const suffix = this.suffixMatching(fileType);
    const content = generateContent(fileType);
    this.writtenToTheFile(name, suffix, content);
  }

  /**
   * 根据文件类型返回后缀
   * @param fileType 
   * @returns 
   */
  private suffixMatching(fileType: string): string {
    switch (fileType) {
      case 'JavaScript':
        return 'js'
      case 'Java':
        return 'java'
      case 'Typescript':
        return 'ts'
      case 'Vue':
        return 'vue'
      case 'MarkDown':
        return 'md'
      case 'React':
        return 'jsx'
      default:
        return 'js'
    }
  }

  /**
   * 写入文件
   * @param name 文件名
   * @param type 文件类型
   * @param contentTpl 内容
   */
  private async writtenToTheFile(
    name: string | Promise<string>,
    type: string,
    contentTpl: string
  ): Promise<void> {
    let file = vscode.Uri.file(`./${name}.${type}`)
    let edit = new vscode.WorkspaceEdit()
    edit.createFile(file)
    // window.setStatusBarMessage('开始获取数据并生成,请稍候...', 2000);
    edit.insert(file, new vscode.Position(0, 0), contentTpl)
    await vscode.workspace.applyEdit(edit)
  }
}
module.exports = generateFile
