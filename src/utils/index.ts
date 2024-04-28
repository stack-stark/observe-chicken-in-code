import * as fs from "fs";

/**
 * 检查指定路径是否存在。
 * @param p 要检查的路径，类型为字符串。
 * @returns 返回一个布尔值，如果路径存在则为true，否则为false。
 */
export const pathExists = (p: string): boolean => {
  try {
    fs.accessSync(p); // 尝试访问指定路径，同步方式执行
  } catch (err) {
    return false; // 如果访问出错，则路径不存在，返回false
  }
  return true; // 无异常抛出，路径存在，返回true
};

/**
 * 从给定数组中随机获取一个元素。
 * @param array 任意类型的数组。
 * @returns 返回数组中随机选取的一个元素。若数组为空，则抛出错误。
 * @throws {Error} 当数组为空时抛出。
 */
export const getRandomArrayElement = <T>(array: T[]): T => {
  if (array.length === 0) {
    throw new Error("数组不能为空");
  }

  // 生成一个随机索引
  const index = Math.floor(Math.random() * array.length);

  // 根据随机索引返回对应的数组元素
  return array[index];
};

/**
 * 创建一个注释字符串，将提供的内容拆分并格式化为指定字符数的行。
 * @param content 要创建注释的内容，必须为字符串类型。
 * @param charsPerLine 每行允许的最大字符数，默认为50。内容将根据此参数进行拆分。
 * @returns 返回一个字符串，其中原始内容被格式化为多个长度不超过 charsPerLine 的行，每行以星号 (*) 开头。
 * @throws 如果 content 不是字符串类型，将抛出 TypeError。
 */
export const createAnnotation = (
  content: string,
  charsPerLine: number = 50
): string => {
  // 检查 content 参数是否为字符串类型
  if (typeof content !== "string") {
    throw new TypeError("Expected content to be a string");
  }

  // 初始化一个数组用于存放每一行的注释内容
  let lines: string[] = [];

  // 计算需要拆分的行数
  const numOfLines = Math.ceil(content.length / charsPerLine);

  // 遍历计算出的行数，将内容拆分并添加到 lines 数组中
  for (let i = 0; i < numOfLines; i++) {
    const start = i * charsPerLine;
    const end = Math.min(start + charsPerLine, content.length);
    const lineContent = content.slice(start, end);

    // 将每行内容格式化后添加到 lines 数组
    lines.push(`* ${lineContent}`);
  }

  // 因拆分时已确保行长度，故不需要额外处理最后一行的换行符

  // 将 lines 数组中的所有行使用换行符连接并返回
  return lines.join("\n");
};

/**
 * 从给定的字符串中提取并解析JSON数据。
 * 该函数假设输入字符串包含一个以特定模式封装的JSON字符串，
 * 并尝试从该字符串中提取并解析JSON数据。
 *
 * @param data 包含嵌入JSON数据的字符串。
 * @returns 解析后的JSON数据。数据类型根据解析结果动态确定。
 * @throws 如果输入数据格式不正确，或者无法解析为有效的JSON格式，则抛出错误。
 */
export const extractAndParseJsonpgzData = (data: string): any => {
  const START_PATTERN = "jsonpgz(";
  const END_PATTERN = ")";

  // 检查数据是否包含预期的起始和结束标记
  if (!data.includes(START_PATTERN) || !data.includes(END_PATTERN)) {
    throw new Error("输入数据格式不正确，缺少起始或结束标记。");
  }

  const startIndex = data.indexOf(START_PATTERN) + START_PATTERN.length;
  const endIndex = data.lastIndexOf(END_PATTERN);

  // 确保起始和结束标记位置正确，即标记不是在相同位置或不存在
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("输入数据格式不正确，无法解析JSON字符串。");
  }

  // 从字符串中提取JSON数据
  const jsonString = data.substring(startIndex, endIndex);

  try {
    // 尝试解析JSON字符串
    return JSON.parse(jsonString);
  } catch (error) {
    // 如果解析失败，打印错误并抛出异常
    console.error("解析JSON字符串时发生错误：", error);
    throw new Error("输入数据不是有效的JSON格式。");
  }
};
