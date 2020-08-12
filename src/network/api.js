import { service } from "./index";

//使用
export function getInfo(params) {
  return service({
    url: '/user/info',
    method: 'get',
    params
  });
}