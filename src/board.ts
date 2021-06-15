import * as vscode from 'vscode'
import Axios from 'axios'

class BoardCreateRun {

  /**
   * 大盘指数情况生成主方法
   * @returns 大盘指数情况 string 
   */
  async boardStringMain(): Promise<string> {
    const simple: boolean = vscode.workspace.getConfiguration().get('stack.chickenSimple') || true;
    let codeString = '';
    const array: Array<BoardDataType> = await this.getBoardData();
    if(simple) {
      for (const it of array) {
        codeString += this.createBoardString(it);
      }
    }else{
      for (const it of array) {
        codeString += this.createBoardStringSimple(it);
      }
    }
    return codeString;
  }


  /**
   * 获取大盘指数数据
   * @returns
   */
   private async getBoardData(): Promise<Array<any>> {
    const res: any = await Axios.get(
      'https://api.doctorxiong.club/v1/stock/board'
    ).catch((err) => {
      vscode.window.showInformationMessage(err)
    })
    if (res.data && res.data.data) {
      return res.data.data
    }
    return []
  }

  /**
   * 拼接大盘数据
   * @param data
   * @returns
   */
  private createBoardString(data: BoardDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
      // 股票代码 
      const code = '${data.code}';\n 
      // 股票名称
      const name = '${data.name}';\n
      // 类型GP(股票),ZS(指数)
      const type = '${data.type}';\n
      // 今日开盘价
      const open = '${data.open}';\n
      // 昨日收盘价
      const close = '${data.close}';\n
      // 实时价格
      const price = '${data.price}';\n
      // 开盘后价格变化
      const priceChange = '${data.priceChange}';\n
      // 价格变化,单位为百分比
      const changePercent = '${data.changePercent}%';\n
      // 开盘截至目前最高价
      const high = '${data.high}';\n
      // 开盘截至目前最低价
      const low = '${data.low}';\n
      // 成交量 单位手
      const volume = '${data.volume}';\n
      // 成交额 单位万
      const turnover = '${data.turnover}';\n
      // 总市值 单位亿
      const totalWorth = '${data.totalWorth}';\n
      // 数据更新日期
      const date = '${data.date}';\n }
      \r\n`;
    return string;
  }

  /**
   * 拼接大盘数据
   * @param data
   * @returns
   */
   private createBoardStringSimple(data: BoardDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
        // 股票代码 
        const code = '${data.code}';\n 
        // 股票名称
        const name = '${data.name}';\n
        // 实时价格
        const price = '${data.price}';\n
        // 价格变化,单位为百分比
        const changePercent = '${data.changePercent}%';\n
        // 数据更新日期
        const date = '${data.date}';\n }
        \r\n`;
    return string;
  }
}
module.exports = BoardCreateRun
