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
const vscode = require('vscode');
import Axios from 'axios';
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

interface FundDataType {
  code: string,	
  name: string,	
  type: string,	
  netWorth: string,	
  expectWorth: string,
  totalWorth: string,	
  expectGrowth: string,	
  dayGrowth: string,	
  lastWeekGrowth: string,	
  lastMonthGrowth: string,
  lastThreeMonthsGrowth: string,
  lastSixMonthsGrowth: string,	
  lastYearGrowth: string,	
  buyMin: Number,	
  buySourceRate: Number,	
  buyRate: Number,	
  manager: string,	
  fundScale: string,	
  worthDate: string,	
  expectWorthDate: string
}
class Chicken {

  /**
   * 主方法
   */
  async commandHandel() {
    const tpl: string = await this.createCode();
    const editor = vscode.editor || vscode.window.activeTextEditor; // 选中文件
    editor.edit((editBuilder: any) => {
      editBuilder.insert(new vscode.Position(1, 0), tpl); // 插入
      setTimeout(() => {
        editor.document.save();
      }, 200);
    })
  }

  /**
   * 拼接代码
   * @returns 
   */
  async createCode(): Promise<string> {
    let codeString: string = '';
    const chickenArray: Array<string> = vscode.workspace.getConfiguration().get('chickenArray') || [];
    const array: Array<BoardDataType> = await this.getBoardData();
    for (const it of array) {
      codeString += this.createBoardString(it);
    }
    for await (const some of chickenArray) {
      codeString += await this.getFundDetailByCode(some);
    }
    return codeString;
  }

  setHeader() {

  }

  /**
   * 根据code获取详情并生成代码 
   * @param code 
   * @returns 
   */
  async getFundDetailByCode(code: string): Promise<string> {
    const res: any = await Axios.get(`https://api.doctorxiong.club/v1/fund/detail?code=${code}`);
    if(res.data && res.data.data) {
      return this.createString(res.data.data);
    }
    return '\n'
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

  /**
   * 拼接大盘数据
   * @param data 
   * @returns 
   */
  createBoardString(data: BoardDataType): string {
    let str = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
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

  /**
   * 拼接基金数据
   * @param data 
   * @returns 
   */
  createString(data: FundDataType): string {
    let str = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
    // 基金代码 
    const code = '${data.code}';\n 
    // 基金名称
    const name = '${data.name}';\n
    // 基金类型 
    const type = '${data.type}';\n 
    // 当前基金单位净值
    const netWorth = '${data.netWorth}';\n
    // 当前基金单位净值估算 
    const expectWorth = '${data.expectWorth}';\n 
    // 当前基金累计净值
    const totalWorth = '${data.totalWorth}';\n
    // 当前基金单位净值估算日涨幅,单位为百分比 
    const expectGrowth = '${data.expectGrowth}';\n 
    // 单位净值日涨幅,单位为百分比
    const dayGrowth = '${data.dayGrowth}';\n
    // 单位净值周涨幅,单位为百分比 
    const lastWeekGrowth = '${data.lastWeekGrowth}';\n 
    // 单位净值月涨幅,单位为百分比
    const lastMonthGrowth = '${data.lastMonthGrowth}';\n
    // 单位净值三月涨幅,单位为百分比 
    const lastThreeMonthsGrowth = '${data.lastThreeMonthsGrowth}';\n 
    // 单位净值六月涨幅,单位为百分比
    const lastSixMonthsGrowth = '${data.lastSixMonthsGrowth}';\n
    // 单位净值年涨幅,单位为百分比 
    const lastYearGrowth = '${data.lastYearGrowth}';\n 
    // 起购额度
    const buyMin = '${data.buyMin}';\n
    // 原始买入费率,单位为百分比
    const buySourceRate = '${data.buySourceRate}';\n 
    // 当前买入费率,单位为百分比
    const buyRate = '${data.buyRate}';\n
    // 基金经理 
    const manager = '${data.manager}';\n 
    // 基金规模及日期,日期为最后一次规模变动的日期
    const fundScale = '${data.fundScale}';\n
    // 净值更新日期,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点 
    const worthDate = '${data.worthDate}';\n 
    // 净值估算更新日期,,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点
    const expectWorthDate = '${data.expectWorthDate}';\n}
    \r\n`
    return str
  }

}
module.exports = Chicken
