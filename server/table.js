let user = `create table if not exists user(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  classify VARCHAR(100) NOT NULL,
  time1 VARCHAR(40) NOT NULL,
  img VARCHAR(40) NOT NULL,
  star VARCHAR(40) NOT NULL,
  timelong VARCHAR(40) NOT NULL,
  type VARCHAR(40) NOT NULL,
  actors VARCHAR(100) NOT NULL,
  detail VARCHAR(1000) NOT NULL,
  PRIMARY KEY ( id )
 );`;