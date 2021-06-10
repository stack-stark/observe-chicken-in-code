const body = [
  '/**',
  '* @code: 选择商品类型',
  '* @name: 选择的商品类型',
  ' */',
  'function huaxia() {',
  "// 基金代码' ; ",
  "const code = 'code'; ",
  "// 基金名称' ; ",
  "const name = 'name' ; ",
  "// 当前基金单位净值' ; ",
  "const netWorth = '210' ; ",
  "// 日涨幅,单位为百分比' ; ",
  "const dayGrowth = '210' ; ",
  "// 最近一周涨幅,单位为百分比' ; ",
  "const lastWeekGrowth = '210' ; ",
  "// 最近一个月涨幅,单位为百分比' ; ",
  "const lastMonthGrowth = '210' ; ",
  "// 最近三个月涨幅,单位为百分比' ; ",
  "const lastThreeMonthsGrowth = '210' ; ",
  "// 最近六个月涨幅,单位为百分比' ; ",
  "const lastSixMonthsGrowth = '210' ; ",
  "// 最近一年涨幅,单位为百分比' ; ",
  "const lastYearGrowth = '210' ; ",
  "// 当前基金单位净值' ; ",
  "const netWorth = '210' ; ",
  "// 今年的涨幅,单位为百分比' ; ",
  "const thisYearGrowth = '210' ; ",
  '}',
]
const vscode = require('vscode')
import Axios, { AxiosResponse } from 'axios';

interface BoardDataType {
  code: string,	
  name: string,	
  type: string,	
  open: string,	
  close: string,
  price: string,
  priceChange: string,	
  changePercent: string,	
  high: string,	
  low: string,	
  volume: string,	
  turnover: string,	
  totalWorth: string,	
  date: string
}

/**
 *
 */
class Chicken {
  async commandHandel() {
    const tpl = await this.createCode();
    const editor = vscode.editor || vscode.window.activeTextEditor // 选中文件
    editor.edit((editBuilder: any) => {
      editBuilder.insert(new vscode.Position(1, 0), tpl) // 插入
      setTimeout(() => {
        editor.document.save()
      }, 200)
    })
  }

  /**
   * 拼接代码
   * @returns 
   */
  async createCode(): Promise<string> {
    let codeString = ''
    // const array =  vscode.workspace.getConfiguration().get('stockArray');
    const array: Array<BoardDataType> = await this.getBoardData();
    for (const it of array) {
      codeString += this.createBoardString(it)
    }
    return codeString
  }

  /**
   * 获取大盘指数数据
   * @returns 
   */
  async getBoardData(): Promise<Array<any>>  {
    const res: any  = await Axios.get('https://api.doctorxiong.club/v1/stock/board').catch((err) => {
      vscode.window.showInformationMessage(
        err
      )
    });
    if(res.data && res.data.data) {
      return res.data.data;
    }
    return [];
  }

  createBoardString(data: BoardDataType): string {
    let str = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stock${data.code}() { \n 
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
    const changePercent = '${data.changePercent}';\n
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
    \r\n`
    return str
  }












  createString(code: string, name: string): string {
    let str = `/**\n * @code: ${code}\n * @name: ${name}\n */\nfunction stock${code}() { \n 
    // 基金代码 
    const code = '${code}';\n 
    // 基金名称
    const name = '${name}';\n
    }
    \r\n`
    return str
  }
}
module.exports = Chicken
