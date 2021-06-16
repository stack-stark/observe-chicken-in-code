/**
 * 数组简单去重
 * @param array 
 * @returns 
 */
export const unique = (array: Array<any>) => {
  return Array.from(new Set(array));
};
