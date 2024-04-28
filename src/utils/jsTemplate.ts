import { createAnnotation, getRandomArrayElement } from ".";
import { funcNames } from "../constants/funcNames";
import { jsCodeStrings } from "../constants/jsCodeString";
import { getDataByCode } from "../services";

const funcCreate = (content: string): string => {
  return `
      /**
       ${createAnnotation(content)}
       * @description some description
       * @param {string} data
       * @returns {string}
       */
      public ${getRandomArrayElement(funcNames)} (data){
        ${getRandomArrayElement(jsCodeStrings)}
      }
      \n`;
};

const createBoardStringSimple = (data: any): string => {
  const string = `/**\n * @code: ${data.fundcode}\n * @name: ${
    data.name
  }\n */\n export const ${getRandomArrayElement(funcNames)}${
    data.fundcode
  } = () => { \n 
    // 基金名称 
    const code = '${data.name}';\n 
    // 当日净值
    const name = '${data.dwjz}';\n
    // 估算净值
    const price = '${data.gsz}';\n
    // 价格变化,单位为百分比
    const changePercent = '${data.dwjz > data.gsz ? "+" : "-"} ${
    data.gszzl
  }%';\n
    // 数据更新日期
    const date = '${data.gztime}';\n }
    \r\n`;
  return string;
};

const scriptCreate = async (chickenArray: string[]): Promise<string> => {
  let str = "";
  const reqArray: any[] = [];
  chickenArray.forEach((item) => {
    reqArray.push(getDataByCode(item));
  });
  const res = await Promise.all(reqArray);
  console.log(res, "Promise.all");
  for (const cont of res) {
    str += createBoardStringSimple(cont);
  }
  console.log(str, "Promise.all");
  return str;
};

export const createJsFileTemplate = async (
  chickenArray: string[]
): Promise<string> => {
  return await scriptCreate(chickenArray);
};
