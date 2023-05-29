
export default {
  data() {
    return {
      user: {
        id: 1,
        name: "Jack",
      }
    }
  },
  created() {
    console.log("mixin created");
  },
  methods: {
    // 调用app方法
    // androidName->安卓方法名
    // iosName->ios方法名
    // androidData->传给安卓的参数
    // iosData->传给ios的参数
    // h5Fuc->不属于安卓和ios时调用的函数
    callAPPFunction(androidName, iosName, androidData, iosData, h5Fuc) {
      console.log(111, androidData );
      switch (true) {
        case this.isAndroid:
          window.hitumedia_android_js[androidName](androidData);
          break;
        case this.isIOS:
          window.webkit.messageHandlers[iosName].postMessage(iosData);
          break;
        default:
          h5Fuc;
      }
    },
    isAndroid(){
      let u = navigator.userAgent
      return  u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    },
    isIOS(){
      let u = navigator.userAgent
      return  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
  }
}
