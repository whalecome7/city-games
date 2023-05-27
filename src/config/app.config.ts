import devpConfig from "./devp.config";
import preConfig from "./pre.config";
import testConfig from "./test.config";
import prodConfig from "./prod.config";

const envMap: any = {
  devp: devpConfig,
  pre: preConfig,
  prod: prodConfig,
  test: testConfig,
};
const env = 'prod'
export default envMap[env];
