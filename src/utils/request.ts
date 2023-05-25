import axios from "axios";
import config from "@/config/app.config";
import router from "@/router";
// import { ElMessage, ElLoading } from "element-plus";
import { platform as platformService } from "@/services/platform";
import store from "@/store";

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
 * @param server
 * @param params
 * @param needToken
 * @param checkLanMode 局域网模式所影响的接口为true
 */
const request = (
  method: string,
  url: string,
  server: any,
  params?: any,
  needToken = true,
  checkLanMode = false
) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: needToken ? `Bearer ${token}` : "",
    // Authorization: needToken ? `Bearer ${store.state.token}` : "",
  };

  const handlerError = (error: any, reject: any) => {
    // ElLoading.service({ fullscreen: true }).close();
    // ElLoading.service({ background: "rgb(0,0,0,0.0)" }).close();
    // let message = "";
    // // 网络断开时的提示
    // if (!error.response) {
    //   ElMessage({
    //     offset: 150,
    //     center: true,
    //     type: "warning",
    //     message: `网络连接错误`,
    //   });
    //   reject(error);
    //   return;
    // }
    // if (error.response.data && error.response.data.message) {
    //   message = error.response.data.message;
    // } else {
    //   message = getErrorMessage(error.response.status);
    // }
    // ElMessage({
    //   offset: 150,
    //   center: true,
    //   type: "warning",
    //   message,
    //   onClose: () => {
    //     if (
    //       (error.response.status === 401 && needToken) ||
    //       error.response.data?.data?.finish_exam
    //     ) {
    //       sessionStorage.clear();
    //       router.push({
    //         path: "/login",
    //       });
    //     }
    //   },
    // });
  };
  return new Promise<any>((resolve, reject) => {
    let baseURL = config[server];
    if (checkLanMode && store.state.isLan && store.state.proctorDomain) {
      baseURL = store.state.proctorDomain;
    }
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
        if (data.status_code !== undefined) {
          if (data.status_code === 0) {
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