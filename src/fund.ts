import * as vscode from 'vscode';
import Axios from 'axios';

class FundCreateRun {
  /**
   * 大盘指数情况生成主方法
   * @returns 大盘指数情况 string
   */
  async fundStringMain(): Promise<string> {
    const chickenArray: Array<string> =
      vscode.workspace.getConfiguration().get('stack.chickenArray') || [];
    const codeString = this.createAllString(chickenArray);
    return codeString;
  }

  /**
   * 遍历生成全部代码
   * @param chickenArray
   * @returns
   */
  private async createAllString(chickenArray: Array<string>): Promise<string> {
    let codeString = '';
    const simple: boolean =
      vscode.workspace.getConfiguration().get('stack.chickenSimple') || true;
    if (simple) {
      for await (const some of chickenArray) {
        const data = await this.getFundDetailByCode(some);
        if (data) {
          codeString += this.createStringSimple(data);
        }
      }
    } else {
      for await (const some of chickenArray) {
        const data = await this.getFundDetailByCode(some);
        if (data) {
          codeString += this.createString(data);
        }
      }
    }
    return codeString;
  }

  /**
   * 根据code获取详情
   * @param code
   * @returns
   */
  private async getFundDetailByCode(
    code: string
  ): Promise<FundDataType | null> {
    const res: any = await Axios.get(
      `https://api.doctorxiong.club/v1/fund/detail?code=${code}`
    );
    if (res.data && res.data.data) {
      return res.data.data;
    }
    return null;
  }

  /**
   * 拼接基金数据
   * @param data
   * @returns
   */
  private createString(data: FundDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
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
    const expectGrowth = '${data.expectGrowth}%';\n 
    // 单位净值日涨幅,单位为百分比
    const dayGrowth = '${data.dayGrowth}%';\n
    // 单位净值周涨幅,单位为百分比 
    const lastWeekGrowth = '${data.lastWeekGrowth}%';\n 
    // 单位净值月涨幅,单位为百分比
    const lastMonthGrowth = '${data.lastMonthGrowth}%';\n
    // 单位净值三月涨幅,单位为百分比 
    const lastThreeMonthsGrowth = '${data.lastThreeMonthsGrowth}%';\n 
    // 单位净值六月涨幅,单位为百分比
    const lastSixMonthsGrowth = '${data.lastSixMonthsGrowth}%';\n
    // 单位净值年涨幅,单位为百分比 
    const lastYearGrowth = '${data.lastYearGrowth}%';\n 
    // 起购额度
    const buyMin = '${data.buyMin}';\n
    // 原始买入费率,单位为百分比
    const buySourceRate = '${data.buySourceRate}%';\n 
    // 当前买入费率,单位为百分比
    const buyRate = '${data.buyRate}%';\n
    // 基金经理 
    const manager = '${data.manager}';\n 
    // 基金规模及日期,日期为最后一次规模变动的日期
    const fundScale = '${data.fundScale}';\n
    // 净值更新日期,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点 
    const worthDate = '${data.worthDate}';\n 
    // 净值估算更新日期,,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点
    const expectWorthDate = '${data.expectWorthDate}';\n}
    \r\n`
    return string
  }

  /**
   * 拼接基金数据
   * @param data
   * @returns
   */
  private createStringSimple(data: FundDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nfunction stack${data.code}() { \n 
      // 基金代码 
      const code = '${data.code}';\n 
      // 基金名称
      const name = '${data.name}';\n
      const totalWorth = '${data.totalWorth}';\n
      // 当前基金单位净值估算日涨幅,单位为百分比 
      const expectGrowth = '${data.expectGrowth}%';\n 
      // 单位净值日涨幅,单位为百分比
      const dayGrowth = '${data.dayGrowth}%';\n
      // 净值更新日期,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点 
      const worthDate = '${data.worthDate}';\n 
      // 净值估算更新日期,,日期格式为yy-MM-dd HH:mm.2019-06-27 15:00代表当天下午3点
      const expectWorthDate = '${data.expectWorthDate}';\n}
      \r\n`
    return string
  }
}
module.exports = FundCreateRun
