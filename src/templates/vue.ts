import { getFundDetailByCode } from '../services/fund.service'
import * as vscode from 'vscode'

export class CreateVueRun {
  /**
   * 主方法
   * @returns
   */
  async createCode(): Promise<string> {
    return await this.mainTpl('')
  }

  private async mainTpl(swallow: string): Promise<string> {
    return `<template>
      <div class="page">
        新的页面
      </div>
    </template>
    
    <script>
      export default {
        data() {
          return {
            list: []
          }
        },
        created () {
          this.some();
        },
        methods: {
          some() {
            console.log(some);
          },
          ${swallow}
        },
      }
    </script>
    
    <style lang="scss" scoped>
    .page{
      width: 100%;
      height: 100%;
    }
    </style>`
  }

  /**
   * 遍历生成全部代码
   * @param chickenArray
   * @returns
   */
  private async createAllString(chickenArray: Array<string>): Promise<string> {
    let codeString = ''
    const simple: boolean =
      vscode.workspace.getConfiguration().get('stack.chickenSimple') || true
    if (simple) {
      for await (const some of chickenArray) {
        const data = await getFundDetailByCode(some)
        if (data) {
          codeString += this.createStringSimple(data)
        }
      }
    } else {
      for await (const some of chickenArray) {
        const data = await getFundDetailByCode(some)
        if (data) {
          codeString += this.createString(data)
        }
      }
    }
    return codeString
  }

  private funcFactory() {}

  /**
   * 拼接基金数据
   * @param data
   * @returns
   */
  private createStringSimple(data: FundDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nstack${data.code}() { \n 
      // 基金代码 
      const code = '${data.code}';\n 
      // 基金名称
      const name = '${data.name}';\n
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

  /**
   * 拼接基金数据
   * @param data
   * @returns
   */
  private createString(data: FundDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nstack${data.code}() { \n 
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
   * 拼接大盘数据
   * @param data
   * @returns
   */
  private createBoardString(data: BoardDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nstack${data.code}() { \n 
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
          \r\n`
    return string
  }

  /**
   * 拼接大盘数据
   * @param data
   * @returns
   */
  private createBoardStringSimple(data: BoardDataType): string {
    const string = `/**\n * @code: ${data.code}\n * @name: ${data.name}\n */\nstack${data.code}() { \n 
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
            \r\n`
    return string
  }
}
