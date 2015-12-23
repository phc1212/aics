var ProjectManager = require('../lib/project');
var PackageManager = require('../lib/package');
var AccountManager = require('../lib/account');
var Tools = require('../lib/tools');

module.exports = function(){

	var controller = process.argv[2];
    var havc = false;
    if(controller == "adduser"){
        havc = true;
        if(process.argv[3]){
           AccountManager.adduser(process.argv[3]);
        }else{
           console.log("error , like 'aics adduser fami@163.com'");
        }
    }if(controller == "-v"){
        havc = true;
         console.log("version 0.0.1");
    }if(controller == "-u"){
        havc = true;
        var account = AccountManager.get();
        console.log(account.username);
    }if(controller == "-h"){
        havc = true;
        console.log("============================ aics 帮助 =================================");
        console.log("adduser                                 增加注册用户信息，可访问http://code-depot.cc 获取帐号");
        console.log("init                                    将当前目录初始化为AICS管理目录");
        console.log("add [package name]                      当前项目添加包");
        console.log("update                                  更新依赖包");
        console.log("publish                                 发布当前目下的所有自定义包");
        console.log("==========================================================================");
    }else if(controller == "init"){
        havc = true;
        ProjectManager.init();
    }else if(controller == "add"){
        Tools.checkProject();
        havc = true;
        ProjectManager.add(process.argv[3]);
    }else if(controller == "update"){
        Tools.checkProject();
        havc = true;
        ProjectManager.update(process.argv[3]);
    }else if(controller == "publish"){
        Tools.checkProject();
        havc = true;
        PackageManager.publish(process.argv[3]);
    }else if(controller == "-dev"){
        havc = true;
        process.env.DEBUG = 1;
        console.log("已设置成开发模式");
    }else if(controller == "-online"){
        havc = true;
        process.env.DEBUG = 0;
        console.log("已设置成生产模式");
    }else if(controller == "config"){
        havc = true;
        var aicsConfig = require('../lib/config');
        console.log(aicsConfig);
    }

    

    if(!havc){
     
      console.log("未发现相关命令。使用-h参数了解目前支持功能。");
      
    }
}