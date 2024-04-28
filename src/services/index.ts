import axios from "axios";
import { extractAndParseJsonpgzData } from "../utils";
import { RealTimeDataByCode } from "./apis";

export const getDataByCode = async (code: string) => {
  return axios.get(RealTimeDataByCode(code)).then((res) => {
    return extractAndParseJsonpgzData(res.data);
  });
};
