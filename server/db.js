const mysql = require('mysql');//引入mysql模块
const databaseConfig = { host: 'localhost', user: 'root', port: '3306', password: 'wyulang', database: 'demo', multipleStatements: true }
const sql = require('node-transform-mysql')
//引入数据库配置模块中的数据
class db {
  constructor() {
    this.sql = sql
  }
  excel(sql, params = [], callback) {
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    let connection = mysql.createConnection(databaseConfig);

    connection.connect(connect => {
      if (connect) {
        callback(connect);
        return;
        // throw connect
      } else {
        //开始数据操作
        //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query(sql, params, (err, res, fileds) => {
          if (err) {
            callback(err);
            return;
          } else {
            //关闭数据库连接
            connection.end(end => {
              if (end) {
                callback(end);
                return;
                // throw end
              } else {
                //将查询出来的数据返回给回调函数
                //results作为数据操作后的结果，fields作为数据库连接的一些字段
                callback({ code: '2000', data: res });
              }
            })
          }
        })
      }
    })
  }

  query(sql) {
    return new Promise((success, error) => {
      this.excel(sql, null, res => {
        if (res.code == 2000) {
          success(res);
        } else {
          error(res)
        }
      });
    }).catch(err => {
      let error = err.sqlMessage || "未知错误";
      return { code: 102, message: error, sql: err.sql };
    })
  }

  selectTable(database) {
    return `select table_name from information_schema.tables where table_schema='${database}'`
  }
  // limit()

}

module.exports = new db();