import { Db } from "./db";
import * as requestHandler from "../utils/httpRequest";

/**
 * 数据库模块的通用请求方法
 *
 * @author haroldhu
 * @internal
 */
export class Request {
  /**
   * db 的实例
   *
   * @internal
   */
  private db: Db;

  /**
   * 加密ID
   *
   * @internal
   */
  private secretId: string;

  /**
   * 加密凭据
   *
   * @internal
   */
  private secretKey: string;

  /**
   * 公共参数
   *
   * @internal
   */
  private commParam: Object;

  /**
   * 初始化
   *
   * @internal
   * @param db
   */
  constructor(db: Db) {
    this.db = db;
    this.secretId = this.db.config.secretId;
    this.secretKey = this.db.config.secretKey;
    this.commParam = {
      appid: db.config.mpAppId,
      envName: db.config.envName,
      timestamp: new Date().valueOf(),
      eventId: ""
    };
  }

  /**
   * 发送请求
   *
   * @param api   - 接口
   * @param data  - 参数
   */
  send(api?: string, data?: Object): Promise<any> {
    const params = Object.assign({}, data, this.commParam, {
      action: `database.${api}`
    });
    // console.log(this.db.config);
    return requestHandler({
      secretId: this.secretId,
      secretKey: this.secretKey,
      params,
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      proxy: this.db.config.proxy
    });
  }
}
