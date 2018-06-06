/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : my_news_test

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2017-12-04 10:01:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `node_user`
-- ----------------------------
DROP TABLE IF EXISTS `node_user`;
CREATE TABLE `node_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `Message` varchar(200) DEFAULT NULL,
  `Time` char(19) DEFAULT NULL,
  `IPAddress` char(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_user
-- ----------------------------
/*INSERT INTO `node_user` VALUES ('114', 'Server', '25', 'This is a Server.\n', '2017-12-04,09:57:40', '222.31.79.178');
INSERT INTO `node_user` VALUES ('115', 'Client of XP', '25', 'This is a client with XP OS.', '2017-12-04,09:58:35', '222.31.79.168');
INSERT INTO `node_user` VALUES ('116', 'client 2', '25', 'This is a client with iOS OS', '2017-12-04,10:01:03', '222.31.79.168');
*/