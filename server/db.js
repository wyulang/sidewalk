const mysql = require('mysql');//引入mysql模块
const databaseConfig = { host: 'localhost', user: 'root', port: '3306', password: 'wyulang', database: 'demo' }
const sql = require('node-transform-mysql')
//引入数据库配置模块中的数据
class db {
  constructor(){
    this.sql= sql
  }
  excel(sql, params = [], callback) {
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    let connection = mysql.createConnection(databaseConfig);

    connection.connect(connect => {
      if (connect) {
        callback && callback({ code: '100', message: '数据库链接失败' });
        throw connect
      } else {
        //开始数据操作
        //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query(sql, params, (err, res, fileds) => {
          if (err) {
            callback && callback({ code: '101', message: '数据操作失败' });
            throw err
          } else {
            //关闭数据库连接
            connection.end(end => {
              if (end) {
                callback && callback({ code: '102', message: '数据操作失败' });
                throw end
              } else {
                //将查询出来的数据返回给回调函数
                //results作为数据操作后的结果，fields作为数据库连接的一些字段
                callback && callback({ code: '2000', data: res }, fileds);
              }
            })
          }
        })
      }
    })
  }

  query(sql) {
    // console.log('sql', sql)
    return new Promise((success, error) => {
      this.excel(sql, null, (res, fields) => {
        if (res.code == 2000) {
          success(res)
        } else {
          error(res)
        }
      });
    })
  }

  selectTable(database){
    return `select table_name from information_schema.tables where table_schema='${database}'`
  }
  // limit()

}

module.exports = new db();