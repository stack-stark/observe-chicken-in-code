import * as vscode from "vscode";
import fundSuggestList from "./constants/fundSuggestData";
import { window } from "vscode";

// 定义配置键为常量，避免魔法字符串
const CONFIGURATION_KEY = "stack.chickenArray";

export class AddFund {
  // 保留原方法名，以遵循修改要求
  async commandHandel() {
    try {
      const code = await window.showQuickPick(fundSuggestList, {
        placeHolder: "请输入基金代码",
      });
      if (code) {
        const fundCode = code.split("|")[0];
        this.setFundConfig(fundCode);
      }
    } catch (error) {
      console.error("处理命令时发生错误:", error);
      // 可以添加更多的错误处理逻辑，如向用户显示错误信息
    }
  }

  // 移动到工具类或模块中将提高代码复用性，但为满足要求，这里保持原样
  unique = <T>(array: Array<T>) => {
    const uniqueSet = new Set(array);
    return [...uniqueSet];
  };

  /**
   * 增加配置
   * @param code
   */
  setFundConfig(code: string) {
    try {
      window.setStatusBarMessage("正在更新配置...", 2000);
      let fundCodes: string[] | undefined =
        vscode.workspace.getConfiguration().get(CONFIGURATION_KEY) || [];

      // 确保输入为有效数组
      if (!Array.isArray(fundCodes)) {
        fundCodes = [];
      }

      fundCodes.push(code);
      vscode.workspace
        .getConfiguration()
        .update(CONFIGURATION_KEY, this.unique(fundCodes), true);

      // 更新成功后给予反馈
      window.setStatusBarMessage("配置已更新", 2000);
    } catch (error) {
      console.error("更新配置时发生错误:", error);
      // 可以考虑向用户显示错误信息或采取其他错误处理措施
    }
  }
}
