//模块依赖
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var fs = require('fs');
//var config = require('./config');
//解析json文件
var file = "./config.json";
var config = JSON.parse(fs.readFileSync(file));
//连接mysql
var db = mysql.createConnection(config);
console.log('数据库连接success');
//创建应用
var app = express();
app.use(express.static('www'));

//添加中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//var id=1;

exports = module.exports = function (path) {
    console.log("access exports");
    //add_question的后台逻辑
    app.post("/header", function (req, res, next) {
        var dataArray_Object = req.body;
        console.log(dataArray_Object);
        for (var data in dataArray_Object) {
            console.log(data);
            dataArray = JSON.parse(data);
            console.log(dataArray);
            console.log("req.title:", dataArray.title);
            console.log("req.group:", dataArray.group_id);
            console.log("req.type:", dataArray.type);

            db.query("INSERT INTO `question`(title,group_id,type) VALUES(?,?,?)", [dataArray.title, dataArray.group_id, dataArray.type], function (err, info) {
                if (err) {
                    return next(err);
                } else {
                    dataArray.question_options.forEach(function (data, index) {
                        //console.log("NO",index);
                        console.log(data);
                        console.log("req.option:", data.option);
                        console.log("req.istrue:", data.is_true);
                        db.query("INSERT INTO `question_option`(content,question_id,is_true) VALUES(?,?,?)", [data.option, info.insertId, data.is_true], function (err, info) {
                            if (err) {
                                return next(err);
                            }
                        });
                    });
                }
            });
        }
    });

    //获取所有的题目分组
    app.get("/group_list", function (req, res) {
        //查询全部group_id对应的题目分组
        db.query("select course_groups.id,course_groups.group_name from course_groups", function (err, results) {
            if (err) {
                throw err;
            } else {
                //console.log(results);
                //发送到前端
                res.send(results);
            }
        });
    });

    // app.get("/ajax_data", function(req,res){
    // 	res.send('hello world!');
    // });

    // db.query("select id,title,type from question ",function(err,results){
    // 	if(err){
    // 		throw err;
    // 	}else{
    // 		console.log(results);
    // 		var questionData=[];
    // 		for (var i = 0; i < results.length ; i++) {
    // 			var title =  results[i].title;
    // 			console.log(title);
    // 			var type = results[i].type;
    // 			console.log(type);
    // 			var id = results[i].id;
    // 			db.query("select content from question_options where question_options.question_id=?",[id],function(err,option_results){
    // 				if(err){
    // 					throw err;
    // 				}else{
    // 					//console.log(option_results);
    // 					var option = new Array(option_results[0].content,option_results[1].content,option_results[2].content,option_results[3].content);
    // 					console.log(option);
    // 					var questionObject = {
    // 							title : title,
    // 							option :option,
    // 							type : type
    // 					}
    // 					questionData.push(questionObject);
    // 				}
    // 			});
    // 		}
    // 		app.get("/getQuestion",function(req,res){
    // 			//在这里面返回所有的题目数据
    // 			console.log(questionData);
    // 			res.send(questionData);
    // 		});
    // 	}
    // });
    //all_question页面后台逻辑
    //通过不同课时获取问题
    app.post("/getQuestionByID", function (req, res, next) {
        var data_ID = req.body;
        for (var data in data_ID) {
            console.log(data);
            db.query("select question.id,question.title,question.type,question_type.typeName,question_type.selectType,question_option.content,question_option.is_true from question,question_option,question_type where question.id = question_option.question_id and question.type=question_type.id and question.group_id=?", [data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    //解析id，一个题四个选项
                    //console.log(results);
                    var questionData = [];
                    for (var i = 0; i < results.length; i = i + 4) {
                        id = results[i].id;
                        title = results[i].title;
                        type = results[i].type;
                        typeName = results[i].typeName;
                        selectType = results[i].selectType;
                        var questionObject = {
                            id: id,
                            title: title,
                            type: type,
                            typeName: typeName,
                            selectType: selectType,
                            options: []
                        }
                        results.forEach(function (item) {
                            //判断符合此题目要求的选项，并放入对象数组当中
                            if (item.id == id) {
                                var content = item.content;
                                console.log(content);
                                var is_true = item.is_true;
                                console.log(is_true);
                                questionObject.options.push({
                                    content: content,
                                    is_true: is_true
                                });
                            }
                        });
                        questionData.push(questionObject);
                    }
                    //在这里面返回所有的题目数据
                    console.log(questionData);
                    res.send(questionData);
                }
            });
        }
    });


    //app.get("/getQuestion",function(req,res){
    //    //两个表联合查询
    //    db.query("select question.id,question.title,question.type,question_option.content from question,question_option where question.id = question_option.question_id",function(err,results){
    //        if(err){
    //            throw err;
    //        }else{
    //            //解析id，一个题四个选项
    //            var questionData=[];
    //            for (var i = 0; i < results.length; i=i+4) {
    //                id = results[i].id;
    //                title = results[i].title;
    //                type = results[i].type;
    //                var questionObject = {
    //                    title : title,
    //                    option :[],
    //                    type : type
    //                }
    //                results.forEach(function(item){
    //                    //判断符合此题目要求的选项，并放入对象数组当中
    //                    if(item.id==id){
    //                        questionObject.option.push(item.content);
    //                    }
    //                });
    //                questionData.push(questionObject);
    //            }
    //            //在这里面返回所有的题目数据
    //            console.log(questionData);
    //            res.send(questionData);
    //        }
    //    });
    //});

    //添加测试表按钮响应
    app.post("/addTest", function (req, res, next) {
        var newTest_data = req.body;
        console.log(newTest_data);
        for (var data in newTest_data) {
            console.log(data);
            var dataArray = JSON.parse(data);
            console.log(dataArray);
            console.log(dataArray.testName);
            console.log(dataArray.description);
            db.query("INSERT INTO `question_test`(testName,description) VALUES(?,?)", [dataArray.testName, dataArray.description], function (err, info) {
                if (err) {
                    throw err;
                }
            });
        }
    });

    //获取题目所不在的测试表
    app.post("/getOutTest", function (req, res, next) {
        var questionID = req.body;
        console.log(questionID);
        for (var questionID_data in questionID) {
            console.log(questionID_data);
            db.query("select question_test.testId,question_test.testName from question_test where question_test.testId not in (select test_id from test_question_id where question_id = ?)", [questionID_data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    console.log(results);
                    res.send(results);
                }
            });
        }
    });


    //获取题目所在的测试表
    app.post("/getInTest", function (req, res, next) {
        var questionID = req.body;
        console.log(questionID);
        for (var questionID_data in questionID) {
            console.log(questionID_data);
            db.query("select question_test.testId,question_test.testName from question_test where question_test.testId in (select test_id from test_question_id where question_id = ?)", [questionID_data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    console.log(results);
                    res.send(results);
                }
            });
        }
    });

    //添加题目到测试表
    app.post("/addQuestionToTest", function (req, res, next) {
        var question_test_ID = req.body;
        console.log(question_test_ID);
        for (var data in question_test_ID) {
            console.log(data);
            var dataArray = JSON.parse(data);
            console.log(dataArray.testId);
            console.log(dataArray.questionId);
            db.query("INSERT INTO `test_question_id`(test_id,question_id) VALUES(?,?)", [dataArray.testId, dataArray.questionId], function (err, info) {
                if (err) {
                    throw err;
                }
            });
        }
    });

    //从测试表中删除题目
    app.post("/deleteQuestionFromTest", function (req, res, next) {
        var question_test_ID = req.body;
        console.log(question_test_ID);
        for (var data in question_test_ID) {
            console.log(data);
            var dataArray = JSON.parse(data);
            console.log(dataArray.testId);
            console.log(dataArray.questionId);
            db.query("select id from test_question_id where test_id = ? and question_id=?", [dataArray.testId, dataArray.questionId], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    console.log(results);
                    results.forEach(function (item) {
                        var id = item.id;
                        console.log(id);
                        db.query("DELETE from `test_question_id` where id=?", [id], function (err, info) {
                            if (err) {
                                throw err;
                            }
                        });
                    });

                }
            });
        }
    });

    //show_question.html页面后台逻辑
    //获取分类信息和题目数量
    app.post("/group_list_nums", function (req, res) {
        var courseId_info = req.body;
        for(var courseId in courseId_info){
            console.log(courseId);
            //查询全部group_id对应的题目分组
            db.query("select course_groups.id,count(course_groups.id) as nums from course_groups,question where course_groups.id=question.group_id and course_id = ? group by course_groups.id",[courseId], function (err, results_num) {
                if (err) {
                    throw err;
                } else {
                    console.log(results_num);
                    db.query("select course_groups.id,course_groups.group_name from course_groups where course_id = ?",[courseId], function (err, results) {
                        if (err) {
                            throw err;
                        } else {
                                results.forEach(function(item){
                                    var flag = true;
                                   results_num.forEach(function(item2){
                                       if(item.id==item2.id){
                                           item.nums = item2.nums;
                                           flag = false;
                                       }
                                       if(flag){
                                           item.nums = 0;
                                       }
                                   });
                                });
                                //if (i < results_num.length) {
                                //    results[i].nums = results_num[i].nums;
                                //} else {
                                //    results[i].nums = 0;
                                //}
                            }
                            console.log(results);
                            //发送到前端
                            res.send(results);
                    });
                }
            });
        }
    });

    //login.html的后端逻辑
    app.post("/userLogin", function (req, res) {
        var user_info = req.body;
        console.log(user_info);
        for (var user_object in user_info) {
            console.log(user_object);
            var user_data = JSON.parse(user_object);
            db.query("select teacher.password from teacher where teacher.teacher_num = ?", [user_data.userName], function (err, results) {
                console.log(results);
                if (results[0] == undefined) {
                    res.send("0");
                } else if (results[0].password == user_data.password) {
                    res.send("1");
                } else {
                    res.send("2");
                }
            });
        }
    });

    //获取所有测试列表接口
    app.get("/all_test_list", function (req, res) {
        db.query("SELECT * FROM question_test", function (err, results) {
            if(err){
                throw err;
            }else{
                console.log(results);
                /*
                 返回的结构是[{testId:1,testName:'操作系统',description:'单选题和多选题'},{testId,testName,description:},{}]
                 * */
                res.send(results);
            }
        });
    });

    //获取指定测试的题目接口
    /*
        后端的传递时的数据格式为
     {
        id : id,
         title : title,
         type : type,
         typeName : typeName,
         selectType : selectType,
         options :[{
              content:content,
              is_true : is_true
         }，{}，{}，{}]
     }
    * */
    app.post("/getQuestionByTest", function (req, res) {
        var testId_info = req.body;
        console.log(testId_info);
        for (var testId_data in testId_info) {
            db.query("SELECT question.id,question.title,question.type,question_type.typeName,question_type.selectType,question_option.content,question_option.is_true FROM question,question_option,question_type where question.id = question_option.question_id and question.type=question_type.id and question.id in (select test_question_id.question_id from test_question_id where test_question_id.test_id=?)", [testId_data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    var questionData = [];
                    for (var i = 0; i < results.length; i = i + 4) {
                        id = results[i].id;
                        title = results[i].title;
                        type = results[i].type;
                        typeName = results[i].typeName;
                        selectType = results[i].selectType;
                        var questionObject = {
                            id: id,
                            title: title,
                            type: type,
                            typeName: typeName,
                            selectType: selectType,
                            options: []
                        }
                        results.forEach(function (item) {
                            //判断符合此题目要求的选项，并放入对象数组当中
                            if (item.id == id) {
                                var content = item.content;
                                console.log(content);
                                var is_true = item.is_true;
                                console.log(is_true);
                                questionObject.options.push({
                                    content: content,
                                    is_true: is_true
                                });
                            }
                        });
                        questionData.push(questionObject);
                    }

                    console.log(questionData);
                    // console.log(questionData[0].options[0]);
                    res.send(questionData);
                }
            });
        }
    });

    //main.html
    //显示指定老师的所有课程
    //返回的数据格式为
    // {
    //      {
    //          courseName: '随机过程',
    //          courseAddress: '48#305',
    //          courseTime: '每周三下午第二节课'
    //      },{}
    // }
    app.post("/getCourseListByTeacherId", function (req, res) {
        var teacher_id = req.body;
        //console.log("教师ID", teacher_id);
        for (var teacher_data in teacher_id) {
            /* db.query("select count(teacherId) as nums from course where course.teacherId=1",function(err,results_num){
                 if(err){
                     throw err;
                 }else{
                     console.log(results_num);*/
            db.query("SELECT course.courseId,course.courseName,course.courseAddress,course.courseTime,course.coursePictureName FROM course where course.teacherId=?", [teacher_data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    /* //console.log(results);
                     var nums = results_num[0].nums;
                     //console.log(nums);
                     results.unshift({
                         nums:nums
                     });
                     console.log(results);*/
                    //发送到前端
                    res.send(results);
                }
            });
        }
    });

    app.post("/getCourseInfoByCourseId", function (req, res) {
        var course_id = req.body;
        console.log("课程ID", course_id);
        for (var teacher_data in course_id) {
            /* db.query("select count(teacherId) as nums from course where course.teacherId=1",function(err,results_num){
                 if(err){
                     throw err;
                 }else{
                     console.log(results_num);*/
            db.query("SELECT course.courseId,course.courseName,course.courseAddress,course.courseTime,course.coursePictureName FROM course where course.courseId=?", [teacher_data], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    /* //console.log(results);
                     var nums = results_num[0].nums;
                     //console.log(nums);
                     results.unshift({
                         nums:nums
                     });
                     console.log(results);*/
                    //发送到前端
                    console.log(results);
                    res.send(results);
                }
            });
        }
    });

    //  }
    //  });
    //添加课程
    var multipartMiddleware = multipart();
    app.post("/addCourse", multipartMiddleware, function (req, res) {
        console.log(req.body, req.files);
        var course_info = req.body;
        var course_file = req.files.file;
        if (course_info != null && course_file != null) {
            console.log('true');
            var courseName = course_info.courseName;
            var courseAddress = course_info.courseAddress;
            var courseTime = course_info.courseTime;
            var teacherId = course_info.teacherId;
            var path_picture = course_file.path;
            var originalFilename = course_file.originalFilename;
            console.log(courseName);
            console.log(courseAddress);
            console.log(courseTime);
            console.log(teacherId);
            console.log(path_picture);
            console.log(originalFilename);
            //读取图片并把图片写入指定目录
            //fs.createReadStream(path_picture).pipe(fs.createWriteStream('./www/img/upload/' + originalFilename));
            var is = fs.createReadStream(path_picture);
            var os = fs.createWriteStream('./www/img/upload/' + originalFilename);
            is.pipe(os);
            //删除文件操作
            is.on('end', function () {
                fs.unlinkSync(path_picture);
            });
            is.on('error', function (err) {
                throw err;
            });
            //将课程信息和图片名存入数据库
            db.query("INSERT INTO `course`(courseName,courseAddress,courseTime,teacherId,coursePictureName) VALUES(?,?,?,?,?)", [courseName, courseAddress, courseTime,teacherId,originalFilename], function (err, results) {
                if (err) {
                    throw err;
                }
            });
        }
    });

    //更新课程
    app.post('/updateCourse',function(req,res){
        var updateCourse_info = req.body;
        console.log(updateCourse_info);
        for(var updateCourse in updateCourse_info){
            console.log(updateCourse);
            var updateCourse_data = JSON.parse(updateCourse);
            var courseId = updateCourse_data.courseid;
            var courseName = updateCourse_data.courseName;
            var courseAddress = updateCourse_data.courseAddress;
            var courseTime = updateCourse_data.courseTime;
            db.query('update course set courseName=?,courseAddress=?,courseTime=? where courseId=?',[courseName,courseAddress,courseTime,courseId],function(err,info){
               if(err){
                   throw err;
               }
            });
        }
    });

    //删除课程
    app.post('/deleteCourse',function(req,res){
        var courseid = req.body;
        //var courseid = deleteCourse_info.courseid;
        db.query('delete from course where courseId=?',[courseid],function(err,info){
            if(err){
                throw err;
            }
        });
    });

    //获取测试的状态
    app.post("/getStatusOfTest", function (req, res, next) {
        var testIds = req.body;
        for (var testID in testIds) {
        db.query("select status from question_test where testId=?", [testID], function (err, results) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                res.send(results);
            }
        });
        }
    });

    //更改测试的状态
    app.post("/changeStatusOfTest", function (req, res, next) {
        var testIds = req.body;
        var oldStatus,newStatus;
        for (var testID in testIds) {
            db.query("select status from question_test where testId = ?", [testID], function (err, results) {
                if (err) {
                    throw err;
                } else {
                    oldStatus = results;
                    if (results[0].status == 0) newStatus = 1;
                    else newStatus = 0;
                    db.query("update question_test set status = ? where testId = ?", [newStatus, testID], function (err, results) {
                        if (err) {
                            throw err;
                        } else {
                            db.query("select status from question_test where testId = ?", [testID], function (err, results) {
                                res.send(results);
                            });
                        }
                    });
                }
            });
        }
    });

    //根据课程ID获取课程名称
    app.post('/getCourseNameByCourseId',function(req,res){
        var courseId_info = req.body;
        //console.log(courseId_info);
        for(var courseId in courseId_info){
            console.log(courseId);
            db.query('SELECT courseName FROM course where courseId = ?',[courseId],function(err,results){
               if(err){
                   throw err;
               } else{
                   console.log(results);
                   res.send(results);
               }
            });
        }
    });

    //可视化界面接口
    app.post("/visualization",function(req,res){
        var V_testId = req.body;
        //for(var V_tsetId_data in V_testId ){
        /*var wins=[[[1,4],[2,19],[3,1],[4,2],[5,1],[6,3],[7,1],[8,3],[9,1]]];
         var wins2=[[[1,45],[2,78],[3,1],[4,2],[5,1],[6,3],[7,1],[8,3],[9,1]]];*/
        var result = [0,100, 40.5, 30, 90, 33, 24, 12, 5,7,70,100];
        res.send(result);
        // }
    });

    app.listen(6005);
    console.log('server start!');
}