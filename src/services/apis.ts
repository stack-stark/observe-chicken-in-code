const baseUrl = `http://fundgz.1234567.com.cn/js`;

/**
 * 获取基金实时信息
 * @param code
 * @returns
 */
export const RealTimeDataByCode = (code: string) => {
  return `${baseUrl}/${code}.js?callback=a&?rt=${new Date().getTime()}`;
};
