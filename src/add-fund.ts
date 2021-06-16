/*
   o                 /' )
                   /'   (                          ,
               __/'     )                        .' `;
o      _.-~~~~'          ``---..__             .'   ;
 _.--'  b)  stack-stark           ``--...____.'   .'
(     _.      )).      `-._    2021.6.16         <
 `\|\|\|\|)-.....___.-     `-.         __...--'-.'.
   `---......____...---`.___.'----... .'         `.;
                                    `-`           `*/
import * as vscode from 'vscode';
import fundSuggestList from './data/fundSuggestData';
import { window } from 'vscode';
import { unique } from './utils';

class AddFund {
  async commandHandel() {
    window.showQuickPick(fundSuggestList, { placeHolder: '请输入基金代码' }).then((code) => {
      if (code) {
        const fundCode = code.split('|')[0];
        this.setFundConfig(fundCode);
      }
    });
  }

  /**
   * 增加配置
   * @param code 
   */
  setFundConfig(code: string) {
    window.setStatusBarMessage('正在更新配置...', 2000);
    const codeArr: Array<string> | undefined = vscode.workspace.getConfiguration().get('stack.chickenArray') || [];
    codeArr.push(code);
    vscode.workspace.getConfiguration().update('stack.chickenArray', unique(codeArr), true);
  }
}
module.exports = AddFund
