let tcb = require("../../index");
const fs = require("fs");

const assert = require("assert");
const config = require("../config.js");

describe("storage.uploadFile: 上传文件", () => {
  tcb.init(
    Object.assign({
        envName: config.envName,
        mpAppId: config.appId
      },
      config
    )
  );

  let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`)
  // let fileContent = Buffer.from('aaaaa')

  it(
    "上传文件",
    async () => {
      let result = await tcb.uploadFile({
        cloudPath: "test-admin.jpeg",
        fileContent
      });
      console.log(result);
      assert(result, "上传文件失败");
    },
    10000
  );
});
