 /*
 *hichat v0.4.2
 *Wayou Mar 28,2014
 *MIT license
 *view on GitHub:https://github.com/wayou/HiChat
 *see it in action:http://hichat.herokuapp.com/
 var http = require('http');
 */

 

window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function() {
            document.getElementById('info').textContent = '请输入一个昵称 :)';
			//汉化！get yourself a nickName-请输入一个昵称:)
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
        this.socket.on('nickExisted', function() {
            document.getElementById('info').textContent = '昵称被占用 ，请输入其他昵称！';
			//汉化!nickname is taken, choose another pls-昵称被占用，请输入其他昵称!
		
        });
        this.socket.on('loginSuccess', function() {
            document.title = '微思政 | ' + document.getElementById('nicknameInput').value;//汉化hichat-微思政
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
        });
        this.socket.on('error', function(err) {
            if (document.getElementById('loginWrapper').style.display == 'none') {
                document.getElementById('status').textContent = '连接失败！ :(';//汉化！fail to connect:(-连接失败！:(
            } else {
                document.getElementById('info').textContent = '连接失败！ :(';////汉化！fail to connect:(-连接失败！:(
            }
        });
        this.socket.on('system', function(nickName, userCount, type) {
            var msg = nickName + (type == 'login' ? ' 加入' : ' 离开');//汉化joined-加入  left-离开
            that._displayNewMsg('系统 ', msg, '#b55233');//汉化 system-系统
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' 用户' : ' 用户') + ' 在线';
			//汉化 users-用户 online-在线
        });
        this.socket.on('newMsg', function(user, msg, color) {
            that._displayNewMsg(user, msg, color);
        });
        this.socket.on('newImg', function(user, img, color) {
            that._displayImage(user, img, color);
        });
        document.getElementById('loginBtn').addEventListener('click', function() {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                that.socket.emit('login', nickName);
				
            } else {
                document.getElementById('nicknameInput').focus();
            };
        }, false);
        document.getElementById('nicknameInput').addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var nickName = document.getElementById('nicknameInput').value;
                if (nickName.trim().length != 0) {
                    that.socket.emit('login', nickName);
                };
            };
        }, false);
        document.getElementById('sendBtn').addEventListener('click', function() {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            messageInput.value = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsg('我', msg, color);//汉化 me-我 
                return;
            };
        }, false);
        document.getElementById('messageInput').addEventListener('keyup', function(e) {
            var messageInput = document.getElementById('messageInput'),
                msg = messageInput.value,
                color = document.getElementById('colorStyle').value;
            if (e.keyCode == 13 && msg.trim().length != 0) {
                messageInput.value = '';
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsg('我', msg, color);//汉化me-我
            };
        }, false);
        document.getElementById('clearBtn').addEventListener('click', function() {
            document.getElementById('historyMsg').innerHTML = '';
        }, false);
        document.getElementById('sendImage').addEventListener('change', function() {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader(),
                    color = document.getElementById('colorStyle').value;
                if (!reader) {
                    that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
                    this.value = '';
                    return;
                };
                reader.onload = function(e) {
                    this.value = '';
                    that.socket.emit('img', e.target.result, color);
                    that._displayImage('我', e.target.result, color);//汉化me-我
                };
                reader.readAsDataURL(file);
            };
        }, false);
        this._initialEmoji();
        document.getElementById('emoji').addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            emojiwrapper.style.display = 'block';
            e.stopPropagation();
        }, false);
        document.body.addEventListener('click', function(e) {
            var emojiwrapper = document.getElementById('emojiWrapper');
            if (e.target != emojiwrapper) {
                emojiwrapper.style.display = 'none';
            };
        });
        document.getElementById('emojiWrapper').addEventListener('click', function(e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = document.getElementById('messageInput');
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';//汉化emoji-表情失败
            };
        }, false);
    },
    _initialEmoji: function() {
        var emojiContainer = document.getElementById('emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 174; i > 0; i--) {//原表情数量为69修改表情数量上限
            var emojiItem = document.createElement('img');
            emojiItem.src = '../content/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        };
        emojiContainer.appendChild(docFragment);
    },
    _displayNewMsg: function(user, msg, color) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8),
            //determine whether the msg contains emoji
            msg = this._showEmoji(msg);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _displayImage: function(user, imgData, color) {
        var container = document.getElementById('historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _showEmoji: function(msg) {
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,//汉化emoji失败
            emojiIndex,
            totalEmojiNum = document.getElementById('emojiWrapper').children.length;
        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../content/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
            };//*
        };
        return result;
    }
};


/*
var mysql = require('mysql'); 
var TEST_DATABASE = 'my_news_test'; 
var TEST_TABLE = 'chat_history'; 
//创建连接 
var client = mysql.createConnection({ 
  user: 'root', 
  password: '123456', 
}); 
client.connect();
client.query("use " + TEST_DATABASE);
client.query( 
  'SELECT * FROM '+TEST_TABLE, 
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].date, results[i].nickName, results[i].msg);
			  var query1 = 'INSERT INTO TEST_TABLE VALUES(results[i].date, results[i].nickName, results[i].msg);
			  client.query(query1,function(err,rows){
				 if(err){
					 throw err;
				 }else{
					 console.log(rows);
				 } 
			  });
          }
      }   
    client.end(); 
  } 
);
*/
		
		
		
		/*http({
      method:'GET',
     url:'/header',
    }).then(function(res){ 
        var results = res['data'];
        console.log(results);      
        results.forEach(function(item){
            var url = item[0];
            //console.log(item[0]);
            var img = item[1];
            //console.log(img);
            var name = item[2];
            var moduledata ={
                url: url,
                img: img,
                name: name
            }
            moduleinfo.push(moduledata);
        });
     });*/