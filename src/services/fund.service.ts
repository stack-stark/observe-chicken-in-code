import Axios from 'axios';

/**
 * 根据code获取详情
 * @param code 
 * @returns 
 */
export const getFundDetailByCode = async (code: string): Promise<FundDataType | null> => {
  const res: any = await Axios.get(
    `https://api.doctorxiong.club/v1/fund/detail?code=${code}`
  );
  if (res.data && res.data.data) {
    return res.data.data;
  }
  return null;
}

/**
 * 获取大盘指数数据
 * @returns 
 */
export const getBoardData = async (): Promise<Array<any>> => {
  const res: any = await Axios.get(
    'https://api.doctorxiong.club/v1/stock/board'
  );
  if (res.data && res.data.data) {
    return res.data.data;
  }
  return [];
}
