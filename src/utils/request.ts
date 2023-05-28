import axios from "axios";
import config from "@/config/app.config";
import servers from "@/config/servers";
import { showToast, showFailToast } from 'vant';
import { useUserStore } from "@/stores/user";

const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return "请求错误";
    case 401:
      return "未授权，请重新登录";
    case 403:
      return "拒绝访问";
    case 404:
      return "请求出错";
    case 408:
      return "请求超时";
    case 422:
      return "资源错误";
    case 500:
      return "服务器错误";
    case 501:
      return "功能正在路上";
    case 502:
      return "网络错误";
    case 503:
      return "服务不可用";
    case 504:
      return "网络超时";
    case 505:
      return "HTTP版本不受支持";
    default:
      return `连接出错(${status})!`;
  }
};
/**
 *
 * @param method
 * @param url
 * @param params
 * @param needToken
 */
const request = (
  method: string,
  url: string,
  params?: any,
  needToken = true,
) => {
  const userStore = useUserStore()
  // const token = localStorage.getItem("token");
  const token = userStore.token

  const headers = {
    "Content-Type": "application/json",
    Authorization: needToken ? `Bearer ${token}` : "",
  };

  const handlerError = (error: any, reject: any) => {
    let message = "";
    // 网络断开时的提示
    if (!error.response) {
      showFailToast('网络连接错误');
      reject(error);
      return;
    }
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else {
      message = getErrorMessage(error.response.status);
    }
    showToast(message)
  };
  return new Promise<any>((resolve, reject) => {
    let baseURL = config[servers.api];
    axios({
      method,
      headers,
      baseURL,
      url,
      timeout: 15000,
      params: method === "GET" ? params : null, // 是即将与请求一起发送的 URL 参数
      data: method === "POST" || method === "PUT" ? params : null, // 是作为请求主体被发送的数据
    } as any)
      .then((res: any) => {
        const data = res.data;
        if (data.errCode !== undefined) {
          if (data.errCode === 0) {
            resolve(data.data);
          } else {
            handlerError(res, reject);
          }
        } else {
          resolve(res.data);
        }
      })
      .catch((error: any) => {
        handlerError(error, reject);
      });
  });
};

export default request;
