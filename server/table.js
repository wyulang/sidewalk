let user = `create table if not exists user(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) COMMENT '用户名',
  city VARCHAR(50) COMMENT '城市ID',
  address VARCHAR(100) COMMENT '地址',
  idCard VARCHAR(18) COMMENT '身份证',
  header VARCHAR(100) COMMENT '头像',
  createTime VARCHAR(20) COMMENT '创建时间',
  phone VARCHAR(12) COMMENT '手机号',
  password VARCHAR(50) COMMENT '密码',
  email VARCHAR(50) COMMENT '邮箱',
  remark VARCHAR(500) COMMENT '邮箱',
  age VARCHAR(10) COMMENT '年纪',
  type VARCHAR(10) COMMENT '用户类型',
  ip VARCHAR(15) COMMENT 'IP地址',
  sex VARCHAR(2) COMMENT '性别',
  lgCount INT(8) COMMENT '登录次数',
  lgTime VARCHAR(20) COMMENT '登录时间',
  PRIMARY KEY ( id )
 );`;
 let admin = `create table if not exists admin(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) COMMENT '用户名',
  city VARCHAR(50) COMMENT '城市ID',
  createTime VARCHAR(20) COMMENT '创建时间',
  phone VARCHAR(12) COMMENT '手机号',
  password VARCHAR(50) COMMENT '密码',
  email VARCHAR(50) COMMENT '邮箱',
  remark VARCHAR(500) COMMENT '邮箱',
  type VARCHAR(10) COMMENT '用户类型',
  ip VARCHAR(15) COMMENT 'IP地址',
  lgCount INT(8) COMMENT '登录次数',
  lgTime VARCHAR(20) COMMENT '登录时间',
  PRIMARY KEY ( id )
 );`;
 let net = `create table if not exists net(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(120) COMMENT '网站标题',
  type VARCHAR(10) COMMENT '网站类型',
  url VARCHAR(120) COMMENT '用户名',
  createTime VARCHAR(20) COMMENT '创建时间',
  description VARCHAR(220) COMMENT '网站简介',
  PRIMARY KEY ( id )
 );`;

module.exports = {
  user,
  net,
  admin
}