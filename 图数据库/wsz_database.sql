/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : wsz_database

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-26 10:01:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `courseId` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(45) DEFAULT NULL,
  `courseAddress` varchar(45) DEFAULT NULL,
  `courseTime` varchar(45) DEFAULT NULL,
  `teacherId` int(11) NOT NULL,
  `coursePictureName` varchar(45) NOT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('21', 'Linux网络编程', '1号楼203', '周一', '1', '下载.jpg');
INSERT INTO `course` VALUES ('32', '思想道德修养与法律基础', '#48-306', '周一上午', '1', 'timg.jpg');
INSERT INTO `course` VALUES ('33', '中特理论', '48教A804', '周五下午', '2', 'timg.jpg');

-- ----------------------------
-- Table structure for `courselist`
-- ----------------------------
DROP TABLE IF EXISTS `courselist`;
CREATE TABLE `courselist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `intro` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of courselist
-- ----------------------------
INSERT INTO `courselist` VALUES ('1', './img/course1.png', 'Spark从零开始', '本课程旨在让同学们了解Spark基础知识，掌握Spark基础开发。');
INSERT INTO `courselist` VALUES ('2', './img/course2.png', 'R语言入门与进阶', '这门课将会带领您领略R语言的精髓,打开R语言的大门。');
INSERT INTO `courselist` VALUES ('3', './img/course3.png', '机器学习-实现简单神经网络', '人工智能时代，你准备好成为抓住机遇的那百分之二吗。');
INSERT INTO `courselist` VALUES ('4', './img/course4.png', '电商大数据应用之用户画像', '真正接触大数据，接触用户画像，掌握构建用户画像的方法。');

-- ----------------------------
-- Table structure for `course_groups`
-- ----------------------------
DROP TABLE IF EXISTS `course_groups`;
CREATE TABLE `course_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分组id',
  `group_name` varchar(20) NOT NULL COMMENT '分组名',
  `description` varchar(255) DEFAULT '' COMMENT '分组描述',
  `course_id` int(11) unsigned NOT NULL COMMENT '课程id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_groups
-- ----------------------------
INSERT INTO `course_groups` VALUES ('12', '未分组', '默认分组', '21');
INSERT INTO `course_groups` VALUES ('13', 'linux命令', 'linux命令', '21');
INSERT INTO `course_groups` VALUES ('15', '弘扬民族精神', null, '32');
INSERT INTO `course_groups` VALUES ('16', '未分组', null, '33');
INSERT INTO `course_groups` VALUES ('17', '法治体系', null, '32');
INSERT INTO `course_groups` VALUES ('60', '0423', '', '21');

-- ----------------------------
-- Table structure for `documentarylist`
-- ----------------------------
DROP TABLE IF EXISTS `documentarylist`;
CREATE TABLE `documentarylist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(225) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `episodes` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of documentarylist
-- ----------------------------
INSERT INTO `documentarylist` VALUES ('1', './img/video1.png', '互联网时代', '12集');
INSERT INTO `documentarylist` VALUES ('2', './img/video2.png', '现代生活的秘密规则：算法', '1集');
INSERT INTO `documentarylist` VALUES ('3', './img/video3.png', '谷歌与世界头脑', '1集');
INSERT INTO `documentarylist` VALUES ('4', './img/video4.jpg', '大数据时代', '15集');

-- ----------------------------
-- Table structure for `modulelist`
-- ----------------------------
DROP TABLE IF EXISTS `modulelist`;
CREATE TABLE `modulelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(30) DEFAULT NULL,
  `img` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of modulelist
-- ----------------------------
INSERT INTO `modulelist` VALUES ('1', 'course', './img/course.png', '课程');
INSERT INTO `modulelist` VALUES ('2', 'news', './img/news.png', '新闻');
INSERT INTO `modulelist` VALUES ('3', 'video', './img/video.png', '纪录片');
INSERT INTO `modulelist` VALUES ('4', 'paper', './img/paper.png', '论文');

-- ----------------------------
-- Table structure for `newslist`
-- ----------------------------
DROP TABLE IF EXISTS `newslist`;
CREATE TABLE `newslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(225) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newslist
-- ----------------------------
INSERT INTO `newslist` VALUES ('1', './img/news1.png', '指南 ▏如何快速全面建立自己的大数据知识体系？', '2017-07-24 09:37');
INSERT INTO `newslist` VALUES ('2', './img/news2.png', '关于大数据中的用户画像那些事，看这篇一文章就够了', '2017-07-21 15:25');
INSERT INTO `newslist` VALUES ('3', './img/news3.png', '网络爬虫（又被称为网页蜘蛛，网络机器人，在FOAF社区中间，更经常的称为网页追逐者）', '2017-11-13 21:22');

-- ----------------------------
-- Table structure for `paperlist`
-- ----------------------------
DROP TABLE IF EXISTS `paperlist`;
CREATE TABLE `paperlist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pclass` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `time` varchar(50) DEFAULT NULL,
  `keyword` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of paperlist
-- ----------------------------
INSERT INTO `paperlist` VALUES ('1', '[硕士学位论文]', '面向大数据查询的索引技术研究', '朱春莹  计算机科学与技术 山东大学', '2016(学位年度)', '数据查询 数据分类');
INSERT INTO `paperlist` VALUES ('2', '[会议论文]', '大数据及其应用', '冯斐   2015航空试验测试技术学术交流会', '2015', '大数据 特征 处理技术 大数据应用');
INSERT INTO `paperlist` VALUES ('3', '[期刊论文]', '大数据与推荐系统', '李翠平 蓝梦微 邹本友 王绍卿 赵衎衎 《大数据》', '2015年1期', '大数据 OLAP SQL分析 SQL on Hadoop');
INSERT INTO `paperlist` VALUES ('4', '[硕士学位论文]', '人工鱼群算法的分析及改进', '王闯', '2014年', '人工鱼群算法');

-- ----------------------------
-- Table structure for `question`
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '问题id',
  `title` text NOT NULL COMMENT '题目',
  `group_id` int(11) unsigned NOT NULL COMMENT '分组id',
  `explanation` varchar(45) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '类型 0单选 1多选',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('1', '你好用英语怎么说', '1', null, '0');
INSERT INTO `question` VALUES ('2', '苹果英文怎么说', '1', null, '0');
INSERT INTO `question` VALUES ('3', '你喜欢的课程', '2', null, '1');
INSERT INTO `question` VALUES ('5', '你几岁啊？', '2', null, '0');
INSERT INTO `question` VALUES ('45', '红黄蓝幼儿园', '7', null, '0');
INSERT INTO `question` VALUES ('46', '你好吗？', '5', null, '1');
INSERT INTO `question` VALUES ('48', '今天天气如何？', '3', null, '0');
INSERT INTO `question` VALUES ('50', '今天的温度？', '1', null, '0');
INSERT INTO `question` VALUES ('51', '操作系统的定义', '3', null, '0');
INSERT INTO `question` VALUES ('52', '英美散文经典', '1', null, '1');
INSERT INTO `question` VALUES ('56', '都好看', '3', null, '0');
INSERT INTO `question` VALUES ('59', '软件工程', '3', null, '0');
INSERT INTO `question` VALUES ('62', '动画技术', '3', null, '1');
INSERT INTO `question` VALUES ('63', '完整性约束不包括：', '7', null, '0');
INSERT INTO `question` VALUES ('64', '2', '3', null, '0');
INSERT INTO `question` VALUES ('65', '2', '3', null, '0');
INSERT INTO `question` VALUES ('66', '3', '4', null, '0');
INSERT INTO `question` VALUES ('71', '下面的网络协议中，面向连接的的协议是：', '12', null, '0');
INSERT INTO `question` VALUES ('72', '在使用mkdir 命令创建新的目录时，在其父目录不存在时先创建父目录的选项是', '13', null, '0');
INSERT INTO `question` VALUES ('76', '在Red Hat Linux9中，系统默认的（）用户对整个系统拥有完全的控制权', '13', null, '0');
INSERT INTO `question` VALUES ('77', '中华民族伟大精神的核心是', '15', null, '0');
INSERT INTO `question` VALUES ('79', '我国改革开放历史新时期始于', '16', null, '0');
INSERT INTO `question` VALUES ('80', '下列属于中华民族精神重要内容的有：', '15', null, '0');
INSERT INTO `question` VALUES ('81', '（ ）成为推进依法行政和建设法治政府的一项重要抓手。', '17', null, '0');
INSERT INTO `question` VALUES ('82', '《产品质量法》所称的\"货值金额\"以（ ）计算', '17', null, '0');
INSERT INTO `question` VALUES ('83', '《环境保护法》规定，重点污染物排放总量控制指标由（ ）下达，省、自治区、直辖市人民政府分解落实。', '17', null, '0');
INSERT INTO `question` VALUES ('84', '《行政强制法》所称行政强制，包括行政强制措施和（ ）', '17', null, '0');
INSERT INTO `question` VALUES ('88', '社会主义民主是社会主义(    ) 文明的重要标志。', '15', null, '0');
INSERT INTO `question` VALUES ('155', '关键字有哪些?', '46', null, '0');
INSERT INTO `question` VALUES ('156', 'html表', '46', null, '0');
INSERT INTO `question` VALUES ('159', '关键字有哪些?', '50', null, '0');
INSERT INTO `question` VALUES ('160', 'html表', '50', null, '0');
INSERT INTO `question` VALUES ('163', '关键字有哪些?', '52', null, '0');
INSERT INTO `question` VALUES ('164', 'html表', '52', null, '0');
INSERT INTO `question` VALUES ('173', '今天的日期是（）\n', '57', 'B 今天是4月21日\n', '0');
INSERT INTO `question` VALUES ('174', '今天的天气是（）\n', '57', 'C 中雨转大雨\n\n\n\n', '0');
INSERT INTO `question` VALUES ('175', '今天的日期是（）\n', '58', 'B 今天是4月21日\n', '0');
INSERT INTO `question` VALUES ('176', '今天的天气是（）\n', '58', 'C 中雨转大雨\n\n\n\n', '0');
INSERT INTO `question` VALUES ('179', '今天的日期是（）\n', '60', 'B 今天是4月21日\n', '0');
INSERT INTO `question` VALUES ('180', '今天的天气是（）\n', '60', 'C 中雨转大雨\n\n\n\n', '0');

-- ----------------------------
-- Table structure for `question_option`
-- ----------------------------
DROP TABLE IF EXISTS `question_option`;
CREATE TABLE `question_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL COMMENT '问题id',
  `content` varchar(125) NOT NULL COMMENT '选项',
  `is_true` int(2) DEFAULT NULL COMMENT '是否正确 0正确 1错误 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question_option
-- ----------------------------
INSERT INTO `question_option` VALUES ('1', '1', 'hello', '1');
INSERT INTO `question_option` VALUES ('2', '1', 'hai', '0');
INSERT INTO `question_option` VALUES ('3', '1', 'xixi', '0');
INSERT INTO `question_option` VALUES ('4', '1', 'dd', '0');
INSERT INTO `question_option` VALUES ('5', '2', 'apple', '1');
INSERT INTO `question_option` VALUES ('6', '2', 'pear', '0');
INSERT INTO `question_option` VALUES ('7', '2', 'watermalen', '0');
INSERT INTO `question_option` VALUES ('8', '2', 'lemen', '0');
INSERT INTO `question_option` VALUES ('9', '3', '计算机组成原理', '0');
INSERT INTO `question_option` VALUES ('10', '3', '操作系统', '0');
INSERT INTO `question_option` VALUES ('11', '3', '软件工程', '0');
INSERT INTO `question_option` VALUES ('12', '3', '数据库原理', '1');
INSERT INTO `question_option` VALUES ('13', '5', '23', '0');
INSERT INTO `question_option` VALUES ('14', '5', '45', '1');
INSERT INTO `question_option` VALUES ('15', '5', '67', '0');
INSERT INTO `question_option` VALUES ('16', '5', '11', '0');
INSERT INTO `question_option` VALUES ('107', '45', '红', '0');
INSERT INTO `question_option` VALUES ('108', '45', '黄', '0');
INSERT INTO `question_option` VALUES ('109', '45', '蓝', '0');
INSERT INTO `question_option` VALUES ('110', '45', '黑', '1');
INSERT INTO `question_option` VALUES ('111', '46', '很好', '0');
INSERT INTO `question_option` VALUES ('112', '46', '很棒', '0');
INSERT INTO `question_option` VALUES ('113', '46', '开心', '1');
INSERT INTO `question_option` VALUES ('114', '46', '娱乐', '0');
INSERT INTO `question_option` VALUES ('119', '48', '晴天', '0');
INSERT INTO `question_option` VALUES ('120', '48', '多云', '0');
INSERT INTO `question_option` VALUES ('121', '48', '阴', '0');
INSERT INTO `question_option` VALUES ('122', '48', '雨', '1');
INSERT INTO `question_option` VALUES ('127', '50', '18', '0');
INSERT INTO `question_option` VALUES ('128', '50', '28', '0');
INSERT INTO `question_option` VALUES ('129', '50', '40', '0');
INSERT INTO `question_option` VALUES ('130', '50', '3', '1');
INSERT INTO `question_option` VALUES ('131', '51', '操作系统', '1');
INSERT INTO `question_option` VALUES ('132', '51', '软件工程', '0');
INSERT INTO `question_option` VALUES ('133', '51', '数据库', '0');
INSERT INTO `question_option` VALUES ('134', '51', '数据结构', '0');
INSERT INTO `question_option` VALUES ('135', '52', '论妒忌', '0');
INSERT INTO `question_option` VALUES ('136', '52', '罗马帝国', '0');
INSERT INTO `question_option` VALUES ('137', '52', '现代骑士精神', '1');
INSERT INTO `question_option` VALUES ('138', '52', '华尔兹', '0');
INSERT INTO `question_option` VALUES ('151', '56', '你', '1');
INSERT INTO `question_option` VALUES ('152', '56', '我', '0');
INSERT INTO `question_option` VALUES ('153', '56', '他', '0');
INSERT INTO `question_option` VALUES ('154', '56', '它', '0');
INSERT INTO `question_option` VALUES ('163', '59', 'linux', '0');
INSERT INTO `question_option` VALUES ('164', '59', 'ubantu', '0');
INSERT INTO `question_option` VALUES ('165', '59', 'windows', '1');
INSERT INTO `question_option` VALUES ('166', '59', 'ios', '0');
INSERT INTO `question_option` VALUES ('175', '62', 'morphing', '1');
INSERT INTO `question_option` VALUES ('176', '62', 'deformation', '1');
INSERT INTO `question_option` VALUES ('177', '62', 'information', '0');
INSERT INTO `question_option` VALUES ('178', '62', 'add', '0');
INSERT INTO `question_option` VALUES ('183', '63', '实体完整性', '0');
INSERT INTO `question_option` VALUES ('184', '63', '参照完整性', '0');
INSERT INTO `question_option` VALUES ('185', '63', '用户定义完整性', '0');
INSERT INTO `question_option` VALUES ('186', '63', '数据完整性', '1');
INSERT INTO `question_option` VALUES ('187', '64', '2', '0');
INSERT INTO `question_option` VALUES ('188', '64', '2', '1');
INSERT INTO `question_option` VALUES ('189', '64', '2', '0');
INSERT INTO `question_option` VALUES ('190', '64', '2', '0');
INSERT INTO `question_option` VALUES ('191', '65', '2', '0');
INSERT INTO `question_option` VALUES ('192', '65', '2', '0');
INSERT INTO `question_option` VALUES ('193', '65', '2', '0');
INSERT INTO `question_option` VALUES ('194', '66', '3', '0');
INSERT INTO `question_option` VALUES ('195', '66', '3', '0');
INSERT INTO `question_option` VALUES ('196', '66', '3', '0');
INSERT INTO `question_option` VALUES ('197', '66', '3', '0');
INSERT INTO `question_option` VALUES ('214', '71', '传输控制协议', '1');
INSERT INTO `question_option` VALUES ('215', '71', '用户数据报协议', '0');
INSERT INTO `question_option` VALUES ('216', '71', '网际协议', '0');
INSERT INTO `question_option` VALUES ('217', '71', '网际控制报文协议', '0');
INSERT INTO `question_option` VALUES ('218', '72', '-m', '0');
INSERT INTO `question_option` VALUES ('219', '72', '-f', '0');
INSERT INTO `question_option` VALUES ('220', '72', '-p', '1');
INSERT INTO `question_option` VALUES ('221', '72', '-d', '0');
INSERT INTO `question_option` VALUES ('234', '76', 'NID', '0');
INSERT INTO `question_option` VALUES ('235', '76', 'PID', '1');
INSERT INTO `question_option` VALUES ('236', '76', 'UID', '0');
INSERT INTO `question_option` VALUES ('237', '76', 'CID', '0');
INSERT INTO `question_option` VALUES ('238', '77', '团结统一', '0');
INSERT INTO `question_option` VALUES ('239', '77', '爱国主义', '1');
INSERT INTO `question_option` VALUES ('240', '77', '爱好和平', '0');
INSERT INTO `question_option` VALUES ('241', '77', '自强不息', '0');
INSERT INTO `question_option` VALUES ('246', '79', '文化大革命的结束', '0');
INSERT INTO `question_option` VALUES ('247', '79', '真理标准的大讨论', '0');
INSERT INTO `question_option` VALUES ('248', '79', '党的十一届三中全会', '1');
INSERT INTO `question_option` VALUES ('249', '79', '1992年南方谈话', '0');
INSERT INTO `question_option` VALUES ('250', '80', '天下兴亡，匹夫有责', '1');
INSERT INTO `question_option` VALUES ('251', '80', '先天下之忧而忧，后天下之乐而乐', '0');
INSERT INTO `question_option` VALUES ('252', '80', '采菊东篱下，悠然见南山', '0');
INSERT INTO `question_option` VALUES ('253', '80', '富贵不能淫，贫贱不能移，威武不能屈', '0');
INSERT INTO `question_option` VALUES ('254', '81', '强化行政执法监督', '0');
INSERT INTO `question_option` VALUES ('255', '81', '加强行政执法准确性', '1');
INSERT INTO `question_option` VALUES ('256', '81', '加强行政执法速度', '0');
INSERT INTO `question_option` VALUES ('257', '81', '强化行政执法力度', '0');
INSERT INTO `question_option` VALUES ('258', '82', '违法生产销售产品的标价', '0');
INSERT INTO `question_option` VALUES ('259', '82', '违法生产、销售产品的当事人自述的价格', '1');
INSERT INTO `question_option` VALUES ('260', '82', '违法生产销售产品的实际售价', '0');
INSERT INTO `question_option` VALUES ('261', '82', '物价部门的评估价格', '0');
INSERT INTO `question_option` VALUES ('262', '83', '国务院环境保护主管部门', '0');
INSERT INTO `question_option` VALUES ('263', '83', '国务院', '1');
INSERT INTO `question_option` VALUES ('264', '83', '省级以上人民政府环境保护主管部门', '0');
INSERT INTO `question_option` VALUES ('265', '83', '本级人民政府', '0');
INSERT INTO `question_option` VALUES ('266', '84', '行政诉讼', '0');
INSERT INTO `question_option` VALUES ('267', '84', '行政强制执行', '1');
INSERT INTO `question_option` VALUES ('268', '84', '行政处罚', '0');
INSERT INTO `question_option` VALUES ('269', '84', '行政复议', '0');
INSERT INTO `question_option` VALUES ('282', '88', '物质', '0');
INSERT INTO `question_option` VALUES ('283', '88', '精神', '0');
INSERT INTO `question_option` VALUES ('284', '88', '生态', '0');
INSERT INTO `question_option` VALUES ('285', '88', '政治', '1');
INSERT INTO `question_option` VALUES ('410', '155', 'MADE', '0');
INSERT INTO `question_option` VALUES ('411', '155', 'this', '1');
INSERT INTO `question_option` VALUES ('412', '155', 'super', '0');
INSERT INTO `question_option` VALUES ('413', '155', 'function', '0');
INSERT INTO `question_option` VALUES ('414', '156', 'body', '0');
INSERT INTO `question_option` VALUES ('415', '156', 'input', '0');
INSERT INTO `question_option` VALUES ('416', '156', 'button', '1');
INSERT INTO `question_option` VALUES ('417', '156', '样', '0');
INSERT INTO `question_option` VALUES ('426', '159', 'MADE', '0');
INSERT INTO `question_option` VALUES ('427', '159', 'this', '1');
INSERT INTO `question_option` VALUES ('428', '159', 'super', '0');
INSERT INTO `question_option` VALUES ('429', '159', 'function', '0');
INSERT INTO `question_option` VALUES ('430', '160', 'body', '0');
INSERT INTO `question_option` VALUES ('431', '160', 'input', '0');
INSERT INTO `question_option` VALUES ('432', '160', 'button', '1');
INSERT INTO `question_option` VALUES ('433', '160', '样', '0');
INSERT INTO `question_option` VALUES ('442', '163', 'MADE', '0');
INSERT INTO `question_option` VALUES ('443', '163', 'this', '1');
INSERT INTO `question_option` VALUES ('444', '163', 'super', '0');
INSERT INTO `question_option` VALUES ('445', '163', 'function', '0');
INSERT INTO `question_option` VALUES ('446', '164', 'body', '0');
INSERT INTO `question_option` VALUES ('447', '164', 'input', '0');
INSERT INTO `question_option` VALUES ('448', '164', 'button', '1');
INSERT INTO `question_option` VALUES ('449', '164', '样', '0');
INSERT INTO `question_option` VALUES ('482', '173', '4月20日\n', '0');
INSERT INTO `question_option` VALUES ('483', '173', '4月21日\n', '1');
INSERT INTO `question_option` VALUES ('484', '173', '4月19日\n', '0');
INSERT INTO `question_option` VALUES ('485', '173', '4月18日\n', '0');
INSERT INTO `question_option` VALUES ('486', '174', '晴朗\n', '0');
INSERT INTO `question_option` VALUES ('487', '174', '小雨转中雨\n', '0');
INSERT INTO `question_option` VALUES ('488', '174', '中雨转大雨\n', '1');
INSERT INTO `question_option` VALUES ('489', '174', '暴雨\n', '0');
INSERT INTO `question_option` VALUES ('490', '175', '4月20日\n', '0');
INSERT INTO `question_option` VALUES ('491', '175', '4月21日\n', '1');
INSERT INTO `question_option` VALUES ('492', '175', '4月19日\n', '0');
INSERT INTO `question_option` VALUES ('493', '175', '4月18日\n', '0');
INSERT INTO `question_option` VALUES ('494', '176', '晴朗\n', '0');
INSERT INTO `question_option` VALUES ('495', '176', '小雨转中雨\n', '0');
INSERT INTO `question_option` VALUES ('496', '176', '中雨转大雨\n', '1');
INSERT INTO `question_option` VALUES ('497', '176', '暴雨\n', '0');
INSERT INTO `question_option` VALUES ('506', '179', '4月20日\n', '0');
INSERT INTO `question_option` VALUES ('507', '179', '4月21日\n', '1');
INSERT INTO `question_option` VALUES ('508', '179', '4月19日\n', '0');
INSERT INTO `question_option` VALUES ('509', '179', '4月18日\n', '0');
INSERT INTO `question_option` VALUES ('510', '180', '晴朗\n', '0');
INSERT INTO `question_option` VALUES ('511', '180', '小雨转中雨\n', '0');
INSERT INTO `question_option` VALUES ('512', '180', '中雨转大雨\n', '1');
INSERT INTO `question_option` VALUES ('513', '180', '暴雨\n', '0');

-- ----------------------------
-- Table structure for `question_test`
-- ----------------------------
DROP TABLE IF EXISTS `question_test`;
CREATE TABLE `question_test` (
  `testId` int(11) NOT NULL AUTO_INCREMENT,
  `testName` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `courseId` int(11) NOT NULL,
  `time` int(25) NOT NULL,
  PRIMARY KEY (`testId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question_test
-- ----------------------------
INSERT INTO `question_test` VALUES ('12', 'Linux网络编程（随堂测试）', null, '1', '21', '20');
INSERT INTO `question_test` VALUES ('17', '思修（阶段测试）', null, '0', '32', '20');
INSERT INTO `question_test` VALUES ('18', '中特课第一次测试', '中特课第一次测试', '0', '33', '3');
INSERT INTO `question_test` VALUES ('19', '思修（随堂练习一）', null, '0', '32', '5');
INSERT INTO `question_test` VALUES ('23', 'Linux网络编程（随堂测试2）', null, '0', '21', '20');

-- ----------------------------
-- Table structure for `question_type`
-- ----------------------------
DROP TABLE IF EXISTS `question_type`;
CREATE TABLE `question_type` (
  `id` int(11) NOT NULL,
  `typeName` varchar(45) DEFAULT NULL,
  `selectType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question_type
-- ----------------------------
INSERT INTO `question_type` VALUES ('0', '单选', 'radio');
INSERT INTO `question_type` VALUES ('1', '多选', 'checkbox');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(50) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('163520081203005', '123456', '路慧玲', '女', '2016');
INSERT INTO `student` VALUES ('173520081203002', '123456', '王丹钰', '女', '2017');
INSERT INTO `student` VALUES ('173520081203010', '123456', '武焱丽', '女', '2017');
INSERT INTO `student` VALUES ('173520085211012', '111111', '王宇星', '男', '2017');
INSERT INTO `student` VALUES ('201611143001', '123456', '孙雨佳', '女', '2016');
INSERT INTO `student` VALUES ('201611143002', '123456', '殷翰文', '男', '2016');
INSERT INTO `student` VALUES ('201611143003', '123456', '李文僖', '女', '2016');

-- ----------------------------
-- Table structure for `student_answer`
-- ----------------------------
DROP TABLE IF EXISTS `student_answer`;
CREATE TABLE `student_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentid` varchar(100) NOT NULL,
  `testid` int(50) NOT NULL,
  `questionid_string` varchar(225) NOT NULL,
  `answer_string` varchar(225) NOT NULL,
  `answer_istrue` varchar(225) NOT NULL,
  `trueoption` varchar(225) NOT NULL,
  `testStatus` int(25) NOT NULL DEFAULT '1' COMMENT '0：uncomplete；1：complete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student_answer
-- ----------------------------
INSERT INTO `student_answer` VALUES ('6', '1', '1', '45,48,50,51', '3,2,4,1', '0,0,1,1', '4,4,4,1', '1');
INSERT INTO `student_answer` VALUES ('7', '2', '1', '45,48,50,51', '4,3,4,1', '1,0,1,1', '4,4,4,1', '1');
INSERT INTO `student_answer` VALUES ('8', '3', '1', '45,48,50,51', '3,2,1,1', '0,0,0,1', '4,4,4,1', '1');
INSERT INTO `student_answer` VALUES ('9', '4', '1', '45,48,50,51', '4,4,4,1', '1,1,1,1', '4,4,4,1', '1');
INSERT INTO `student_answer` VALUES ('13', '173520085211012', '4', '1,48', '1,2', '1,0', '1,4', '1');
INSERT INTO `student_answer` VALUES ('14', '173520085211012', '6', '1,5', '1,2', '1,1', '1,2', '1');
INSERT INTO `student_answer` VALUES ('15', '173520085211012', '3', '1,45', '1,4', '1,1', '1,4', '1');
INSERT INTO `student_answer` VALUES ('16', '163520081203005', '4', '1,48', '1,2', '1,0', '1,4', '1');
INSERT INTO `student_answer` VALUES ('17', '173520085211012', '11', '1,2,48,51', '1,1,2,3', '1,1,0,0', '1,1,4,1', '1');
INSERT INTO `student_answer` VALUES ('18', '173520085211012', '24', '1,3,5', '2,2,1', '0,0,0', '1,4,2', '1');
INSERT INTO `student_answer` VALUES ('19', '173520081203010', '4', '1,48', '2,2', '0,0', '1,4', '1');
INSERT INTO `student_answer` VALUES ('20', '173520081203002', '4', '1,48', '3,4', '0,1', '1,4', '1');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_num` varchar(45) DEFAULT NULL,
  `teacherName` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '1', '洪志国', '男', '1');
INSERT INTO `teacher` VALUES ('2', '2', '王宇星', '男', '2');

-- ----------------------------
-- Table structure for `test_question_id`
-- ----------------------------
DROP TABLE IF EXISTS `test_question_id`;
CREATE TABLE `test_question_id` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` varchar(45) NOT NULL,
  `question_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test_question_id
-- ----------------------------
INSERT INTO `test_question_id` VALUES ('40', '6', '5');
INSERT INTO `test_question_id` VALUES ('48', '4', '48');
INSERT INTO `test_question_id` VALUES ('60', '6', '1');
INSERT INTO `test_question_id` VALUES ('66', '1', '48');
INSERT INTO `test_question_id` VALUES ('69', '4', '1');
INSERT INTO `test_question_id` VALUES ('70', '1', '45');
INSERT INTO `test_question_id` VALUES ('74', '1', '50');
INSERT INTO `test_question_id` VALUES ('75', '1', '51');
INSERT INTO `test_question_id` VALUES ('78', '1', '1');
INSERT INTO `test_question_id` VALUES ('79', '3', '45');
INSERT INTO `test_question_id` VALUES ('80', '3', '45');
INSERT INTO `test_question_id` VALUES ('81', '3', '1');
INSERT INTO `test_question_id` VALUES ('82', '11', '1');
INSERT INTO `test_question_id` VALUES ('83', '11', '48');
INSERT INTO `test_question_id` VALUES ('85', '11', '51');
INSERT INTO `test_question_id` VALUES ('87', '12', '73');
INSERT INTO `test_question_id` VALUES ('88', '12', '74');
INSERT INTO `test_question_id` VALUES ('89', '12', '75');
INSERT INTO `test_question_id` VALUES ('90', '12', '72');
INSERT INTO `test_question_id` VALUES ('91', '12', '76');
INSERT INTO `test_question_id` VALUES ('92', '18', '79');
INSERT INTO `test_question_id` VALUES ('93', '17', '77');
INSERT INTO `test_question_id` VALUES ('94', '17', '80');
INSERT INTO `test_question_id` VALUES ('95', '17', '81');
INSERT INTO `test_question_id` VALUES ('96', '17', '82');
INSERT INTO `test_question_id` VALUES ('97', '17', '83');
INSERT INTO `test_question_id` VALUES ('100', '19', '82');
INSERT INTO `test_question_id` VALUES ('101', '19', '81');
INSERT INTO `test_question_id` VALUES ('102', '23', '74');
INSERT INTO `test_question_id` VALUES ('103', '23', '75');
INSERT INTO `test_question_id` VALUES ('104', '17', '85');
INSERT INTO `test_question_id` VALUES ('105', '17', '87');
INSERT INTO `test_question_id` VALUES ('106', '19', '87');
INSERT INTO `test_question_id` VALUES ('107', '18', '87');
INSERT INTO `test_question_id` VALUES ('108', '12', '89');
INSERT INTO `test_question_id` VALUES ('109', '24', '1');
INSERT INTO `test_question_id` VALUES ('110', '18', '5');
INSERT INTO `test_question_id` VALUES ('111', '24', '5');
INSERT INTO `test_question_id` VALUES ('112', '18', '3');
INSERT INTO `test_question_id` VALUES ('113', '17', '3');
INSERT INTO `test_question_id` VALUES ('114', '24', '3');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin');
INSERT INTO `user` VALUES ('2', 'wyx', '1995');
INSERT INTO `user` VALUES ('3', '1', '1');
