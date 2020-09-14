
const profile = {
  username: 'xuke',
  avatar: 'https://pic3.zhimg.com/80/v2-181901f56257c8846a477644d6935671_720w.jpg?source=1940ef5c'
}

const articles = [{
  id: 1,
  author: 'xuke',
  title: 'liunx命令',
  description: 'Linux常用命令',
  picture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3801690356,2873227953&fm=26&gp=0.jpg',
  content: `# Linux常用命令

  ## 系统服务管理

  ### systemctl

  - 启动服务：systemctl start httpd.service
  - 关闭服务：systemctl stop httpd.service
  - 重启服务（不管是否在运行）：systemctl restart httpd.service
  - 重新载入配置（不中断服务）：systemctl reload httpd.service
  - 查看运行状态：systemctl status httpd.service
  - 设置开机启动：systemctl enable httpd.service
  - 禁止开机启动：systemctl disable httpd.service
  - 查看系统安装的服务：systemctl list-units --type=service

  ## 文件管理

  ### ls

  列出/home目录下的子目录：ls -l /home
  列出当前文件夹下所有文件夹及文件大小：ls -lht

  ### pwd

  显示当前工作目录

  ### cd

  切换目录： cd /usr/local

  ### date

  以指定格式显示日期；date '+date:%x time:%X'

  ### passwd

  修改root密码：passwd root

  ### su

  普通用户切换到超级用户：su -

  ### clear

  清除屏幕信息

  ### man

  查看ls命令的帮助信息：man ls

  ### who

  - 查看当前运行级别：who -r
  - 显示用的登录详情：who -buT

  ### free

  以MB显示内存使用状态：free -m

  ### ps

  查看系统所有进程：ps -ef
  查看运行的java进程： ps -ef | grep java

  ### top

  查看系统当前活跃进程信息

  ### mkdir

  创建目录

  ### more

  分页查看
  每10行显示一屏查看：more -c -10

  ### cat

  查看config文件：cat -Ab config

  ### rm

  - 删除文件：rm a.txt
  - 删除文件夹： rm -rf a/

  ### touch

  创建一个文件：touch a.txt

  ### cp

  将目录a的文件拷贝到目录b: cp -r /home/a /home/b

  ### mv

  移动或覆盖文件：mv a.txt b.txt

  ## 压缩与解压

  ### tar

  - 打包文件夹到单独的文件：tar -cvf /opt/etc.tar /etc
  - 压缩文件夹到压缩文件（gzip）：tar -zcvf /opt/etc.tar.gz /etc
  - 压缩文件夹到压缩文件（bzip2）：tar -jcvf /opt/etc.tar.bz2 /etc
  - 查阅压缩包中内容（gzip）：tar -ztvf /opt/etc.tar.gz /etc
  - 解压文件到当前目录（gzip）：tar -zxvf /opt/etc.tar.gz

  ## 磁盘和网络管理

  ### df

  查看磁盘占用情况：df -hT

  ### ifconfig

  查看当前网络接口状态

  ### netstat

  - 查看路由信息：netstat -rn
  - 查看所有有效TCP连接：netstat -an
  - 查看系统中启动的监听服务：netstat -tulnp
  - 查看处于连接状态的系统资源信息：netstat -atunp

  ### wget

  从网络上下载软件

  ## 软件的安装与管理

  ### rpm

  - 安装软件包：rpm -ivh nginx-1.12.2-2.el7.x86_64.rpm
  - 模糊搜索软件包：rpm -qa | grep nginx
  - 精确查找软件包：rpm -qa nginx
  - 查询软件包的安装路径：rpm -ql nginx-1.12.2-2.el7.x86_64
  - 查看软件包的概要信息：rpm -qi nginx-1.12.2-2.el7.x86_64
  - 验证软件包内容和安装文件是否一致：rpm -V nginx-1.12.2-2.el7.x86_64
  - 更新软件包：rpm -Uvh nginx-1.12.2-2.el7.x86_64
  - 删除软件包：rpm -e nginx-1.12.2-2.el7.x86_64

  ### yum

  - 安装软件包： yum install nginx
  - 检查可以更新的软件包：yum check-update
  - 更新指定的软件包：yum update nginx
  - 在资源库中查找软件包信息：yum info nginx*
  - 列出已经安装的所有软件包：yum info installed
  - 列出软件包名称：yum list redis*
  - 模糊搜索软件包：yum search redis

  ## 网络安全

  ### iptables

  - 开启防火墙：systemctl start iptables.service
  - 关闭防火墙：systemctl stop iptables.service
  - 查看防火墙状态：systemctl status iptables.service
  - 设置开机启动：systemctl enable iptables.service
  - 禁用开机启动：systemctl disable iptables.service
  - 查看filter表的链信息：iptables -L -n
  - 查看NAT表的链信息：iptables -t nat -L -n
  - 清除防火墙所有规则：iptables -F;iptables -X;iptables -Z;
  - 添加过滤规则（开发80端口）：iptables -I INPUT -p tcp --dport 80 -j ACCEPT
  - 查找规则所做行号：iptables -L INPUT --line-numbers -n
  - 根据行号删除过滤规则：iptables -D INPUT 1
  `,
  star: 14,
  collect: 1,
  comment: 34,
  dynamicTags: [],
  createAt: '2020-05-20',
  updateAt: '2020-05-27'
}, {
  id: 2,
  author: 'xuke',
  title: ' 设置IDEA快捷键为Eclipse风格',
  description: ' 设置IDEA快捷键为Eclipse风格',
  picture: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3801690356,2873227953&fm=26&gp=0.jpg',
  content: `# 设置IDEA快捷键为Eclipse风格

  - 点击File->Settings->Keymap，选择快捷键风格为Eclipse
  - 按如下表格中的英文描述进行搜索，并改为相应快捷键

  | Eclipse            | IDEA               | 英文描述                        | 中文描述                            |
  | ------------------ | ------------------ | ------------------------------- | ----------------------------------- |
  | ctrl+shift+r       | ctrl+shift+r       | Navigate->File                  | 找工作空间的文件                    |
  | ctrl+shift+t       | ctrl+shift+t       | Navigate->Class                 | 找类定义                            |
  | ctrl+shift+g       | ctrl+shift+g       | Edit->Find->Find Usages         | 查找方法在哪里调用.变量在哪里被使用 |
  | ctrl+t             | ctrl+t             | Other->Hierarchy Class          | 看类继承结构                        |
  | ctrl+o             | ctrl+o             | Navigate->File Structure        | 搜索一个类里面的方法                |
  | shift+alt+z        | shift+alt+z        | Code->Surround With             | 生成常见的代码块                    |
  | shift+alt+l        | shift+alt+l        | Refactor->Extract->Variable     | 抽取变量                            |
  | shift+alt+m        | shift+alt+m        | Refactor->Extract->Method       | 抽取方法                            |
  | alt+left           | alt+left           | Navigate->Back                  | 回退上一个操作位置                  |
  | alt+right          | alt+right          | Navigate->Forward               | 前进上一个操作位置                  |
  | ctrl+home          | ctrl+home          | Move Caret to Text Start        | 回到类最前面                        |
  | ctrl+end           | ctrl+end           | Move Caret to Text End          | 回到类最后面                        |
  | ctrl+2 L           | shift+alt+l        | Refactor->Extract->Variable     | 抽取变量                            |
  | ctrl+e             | alt+r              | View->Recent Files              | 最近打开的文件                      |
  | ctrl+w             | ctrl+w             | Close                           | 关闭当前窗口                        |
  | alt+/              | alt+/              | Code->Completion->Basic         | 提示变量生成                        |
  | ctrl+1             | ctrl+1             | Other->Show Intention Actions   | 提示可能的操作                      |
  | ctrl+h             | ctrl+h             | Find in Path                    | 全局搜索                            |
  | alt+上/下箭头      | alt+上/下箭头      | Code->Move Line Up/Down         | 移动一行代码                        |
  | ctrl+alt+上/下箭头 | ctrl+alt+上/下箭头 | Editor Actions->Duplicate Lines | 复制一行                            |
  | ctrl+shift+j       | ctrl+shift+j       | Other->Fix doc comment          | 方法注释                            |
  | 暂无               | alt+enter          | Other->Show Intention Actions   | 提示常见操作                        |
  | Ctrl+F             | Ctrl+F/Ctrl+R      | Find/Replace                    | 查找替换                            |
  | Shift+Enter        | Shift+Enter        | Start New Line                  | 开启新的一行                        |
  | Ctrl+Alt+S         | Ctrl+Alt+S         | Generate                        | 生成getter,setter,tostring等        |
  `,
  star: 12,
  collect: 12,
  comment: 12,
  createAt: '2020-05-20',
  updateAt: '2020-05-27'
}, {
  'id': 3,
  'author': 'xuke',
  'title': ' Mysql常用命令',
  'description': ' Mysql常用命令',
  'picture': null,
  'content': "# Mysql常用命令\r\n```java\r\npublic void test(){\r\n    private int age;\r\n    private String name;\r\n}\r\n```\r\n\r\n## 数据定义语句(DDL)\r\n\r\n### 数据库操作\r\n\r\n- 登录数据库：mysql -uroot -proot\r\n- 创建数据库：create database test\r\n- 查看所有数据库：show databases\r\n- 使用数据库：use test\r\n- 查看所有数据表：show tables\r\n- 删除数据库：drop database test\r\n\r\n### 表操作\r\n\r\n- 创建表：create table emp(ename varchar(10),hiredate date,sal decimal(10,2),deptno int(2))  \r\n      create table dept(deptno int(2),deptname varchar(10))\r\n- 查看表的定义：desc emp\r\n- 查看表定义（详细）：show create table emp \\G\r\n- 删除表：drop table emp\r\n- 修改表字段：alter table emp modify ename varchar(20)\r\n- 添加表字段：alter table emp add column age int(3)\r\n- 删除表字段：alter table emp drop column age\r\n- 字段改名；alter table emp change age age1 int(4)\r\n- 修改表名：alter table emp rename emp1\r\n\r\n## 数据操纵语句(DML)\r\n\r\n### 插入记录\r\n\r\n- 指定名称插入：insert into emp (ename,hiredate,sal,deptno) values ('zhangsan','2018-01-01','2000',1)\r\n- 不指定名称插入：insert into emp values ('lisi','2018-01-01','2000',1)\r\n- 批量插入数据：insert into dept values(1,'dept1'),(2,'dept2')\r\n\r\n### 修改记录\r\n\r\nupdate emp set sal='4000',deptno=2 where ename='zhangsan'\r\n\r\n### 删除记录\r\n\r\ndelete from emp where ename='zhangsan'\r\n\r\n### 查询记录\r\n\r\n- 查询所有记录：select * from emp\r\n- 查询不重复的记录：select distinct deptno from emp\r\n- 条件查询：select * from emp where deptno=1 and sal<3000\r\n- 排序和限制：select * from emp order by deptno desc limit 2\r\n- 聚合(查询部门人数大于1的部门编号)：select deptno,count(1) from emp group by deptno having count(1) > 1\r\n- 连接查询：select * from emp e left join dept d on e.deptno=d.deptno\r\n- 子查询：select * from emp where deptno in (select deptno from dept)\r\n- 记录联合：select deptno from emp union select deptno from dept\r\n\r\n## 数据控制语句(DCL)\r\n\r\n- 授予操作权限：grant select,insert on test.* to 'test'@'localhost' identified by '123'\r\n- 收回操作权限：revoke insert on test.* from 'test'@'localhost'\r\n\r\n## 其他\r\n\r\n### 字符集相关\r\n\r\n- 查看字符集：show variables like 'character%'\r\n- 创建数据库时指定字符集：create database mall character set utf8\r\n\r\n### 修改时区\r\n\r\n- 修改mysql全局时区为北京时间，即我们所在的东8区：set global time_zone = '+8:00';\r\n- 修改当前会话时区：set time_zone = '+8:00'\r\n- 立即生效：flush privileges\r\n\r\n### 权限相关\r\n\r\n- 授予所有数据库的所有权限：grant all privileges on *.* to z1@localhost identified by '123'\r\n- 授予所有数据库的所有权限(包括grant)：grant all privileges on *.* to z1@localhost with grant option\r\n- 授予SUPER PROCESS FILE权限：grant super,process,file on *.* to z3@localhost\r\n- 只授予登录权限：grant usage on *.* to z4@localhost\r\n- 查看账号权限：show grants for z1@localhost\r\n- 修改自己的密码：set password = password('123')\r\n- 管理员修改他人密码：set password for 'z1'@'localhost' = password('123')\r\n- 删除账号：drop user z2@localhost\r\n\r\n",
  'star': 2,
  'collect': 2,
  'comment': 1,
  'createdAt': '2020-05-20T15:42:22.000+0000',
  'updatedAt': '2020-09-10T12:46:25.000+0000'
}]

module.exports = [
  {
    url: '/vue-admin-template/admin/profile',
    type: 'get',
    response: config => {
    //   const { userId } = config.query

      return {
        code: 20000,
        data: profile
      }
    }
  },
  {
    url: '/vue-admin-template/admin/article',
    type: 'get',
    response: config => {
    //   const { userId } = config.query

      return {
        code: 20000,
        data: articles
      }
    }
  }
]
