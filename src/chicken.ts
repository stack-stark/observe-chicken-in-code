/*
   o                 /' )
                   /'   (                          ,
               __/'     )                        .' `;
o      _.-~~~~'          ``---..__             .'   ;
 _.--'  b)  stack-stark           ``--...____.'   .'
(     _.      )).      `-._    2021.6.10         <
 `\|\|\|\|)-.....___.-     `-.         __...--'-.'.
   `---......____...---`.___.'----... .'         `.;
                                    `-`           `*/
import * as vscode from 'vscode';
import { TextEditor } from 'vscode';
const BoardCreateRun = require('./board');
const FundCreateRun = require('./fund');
import { window } from 'vscode';
class Chicken {
  /**
   * 主方法
   */
  async commandHandel() {
    window.setStatusBarMessage('开始获取数据并生成,请稍候...', 2000);
    const tpl: string = await this.createCode();
    const editor: TextEditor | undefined = vscode.window.activeTextEditor; // 选中文件
    if (editor) {
      editor.edit((editBuilder: any) => {
        editBuilder.insert(new vscode.Position(1, 0), tpl); // 插入
        setTimeout(() => {
          editor.document.save();
        }, 200)
      })
    }
  }

  /**
   * 拼接代码
   * @returns
   */
  async createCode(): Promise<string> {
    let codeString: string = '';
    const board: boolean =
      vscode.workspace.getConfiguration().get('stack.chickenBoard') || true;
    if (board) {
      // 根据用户配置决定是否显示大盘指数
      const bordedRun = new BoardCreateRun();
      codeString += await bordedRun.boardStringMain();
    }
    const fundRun = new FundCreateRun();
    codeString += await fundRun.fundStringMain();
    return codeString;
  }
  
}
module.exports = Chicken
