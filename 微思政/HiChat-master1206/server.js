require('date-utils');

var mysql  = require('mysql'); 
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'my_news_test',
}); 
connection.connect();

//获取IP地址代码段--Start
function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
}  
//获取IP地址代码段--End

var clientIp, clientIp1;
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen(process.env.PORT || 3000,'0.0.0.0');//publish to heroku, IPv4格式
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket
io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            //socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
			//
			    var socketId = socket.id;  
				//clientIp = socket.handshake.remoteAddress; 
				clientIp = socket.handshake.address;
				//clientIp = socket.remoteAddress;	
				//clientIp = socket.handshake.address;
				console.log(clientIp);  
				clientIp1 = clientIp;
				if(clientIp == '127.0.0.1') clientIp1 = getIPAdress();//说明本机是服务器，采用实际IP地址方式，而不是127.0.0.1  
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
	//服务器端将msg存放到数据表中，采用NodeJS代码，2017-12-03		
	var  userAddSql = 'INSERT INTO node_user(id,name,Message,Time,IPAddress) VALUES(0,?,?,?,?)';//20171203PM：重新修改了表结构
	//var  userAddSql_Params = ['王丹煜', 18];
	//var  userAddSql_Params = ['武焱丽', 20];
	var dt = new Date();
	var CurrTime = dt.toFormat("YYYY-MM-DD,HH24:MI:SS")
	//var IPv4 = getIPAdress();
	var  userAddSql_Params = [socket.nickname, msg, CurrTime, clientIp1];
	//增 add
	connection.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }       
       console.log('-------INSERT----------');
       //console.log('INSERT ID:',result.insertId);       
       console.log('INSERT ID:',result);       
       console.log('#######################'); 
		});	
	//connection.end();	//保持数据库连接，不要选择结束，否则会报错“[Error: Cannot enqueue Query after invoking quit.]”的错误
		
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});


