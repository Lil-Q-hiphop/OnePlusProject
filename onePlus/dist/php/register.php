<?php
    //设置编码格式 utf-8；
    header('content-type:text/html;charset="utf-8"');

    $response = array('code' => 0 , 'msg' => '');

    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];
    
    if(!$username){
        $response['code'] = 1;
        $response['msg'] = '用户名不能为空';
        echo json_encode($response);
        exit;
    }
    if(!$password){
        $response['code'] = 2;
        $response['msg'] = '密码不能为空';
        echo json_encode($response);
        exit;
    }
    if($password != $repassword){
        $response['code'] = 3;
        $response['msg'] = '两次密码输入不一致';
        echo json_encode($response);
        exit;
    }
    //高级判断：判断之前有没有注册过;
    //1.连接数据库
    $link = mysql_connect('127.0.0.1','root','123456');

    //2.判断数据库是否链接成功
    if(!$link){
        $response['code'] = 6;
        $response['msg'] = '服务器繁忙';
        echo json_encode($response);
        exit;
    }
    //3.设置编码格式
    mysql_set_charset('utf8');

    //4.选择访问的数据库
    mysql_select_db('h52003');

    //5.准备sql语句
    $sql = "SELECT * FROM oneplus WHERE username='{$username}'";
    //6.发送请求
    $res = mysql_query($sql);
    //取出一行
    $row = mysql_fetch_assoc($res);
    if($row){
        $response['code'] = 4;
        $response['msg'] = '用户名已存在';
        echo json_encode($response);
        exit;
    }

    $str = md5(md5($password).'lilq');
    
    $sql2 = "INSERT INTO oneplus(username,password,createtime) VALUES('{$username}','{$str}',{$createtime})";
    
    $res = mysql_query($sql2);
    if($res){
        $response['msg'] = '注册成功';
        echo json_encode($response);
    }else{
        $response['code'] = 5;
        $response['msg'] = '注册失败';
        echo json_encode($response);
        exit;
    }

    mysql_close();
?>