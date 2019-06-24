# 云服务器安装NGINX
[FinalShell](http://www.hostbuf.com/)

```
1.下载ssh登录客户端

2.通过自己的ip地址，用户名和密码链接远程服务地址

3.安装git

yum install git -y 全局安装

4.下载nvm是node版本控制器

git clone git://github.com/creationix/nvm.git ~/nvm

5.设置nvm自动运行

echo "source ~/nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc

6.查询node版本

nvm list-remote
查看node全部版本

7.安装node

nvm install v11.6.0  版本号
输入node -v就可以查看安装的版本
npm -v npm版本

8.Nginx服务器安装

8.1.安装pcre依赖

yum -y install pcre*
8.2.安装openssl依赖

yum -y install openssl*
以上两个都安装玩之后，接下来开始正式安装了

8.3.在目录创建一个nginx目录

这里面都存放我们安装的nginx

mkdir nginx

8.4.安装nginx服务

wget http://nginx.org/download/nginx-1.14.2.tar.gz 这个是一个压缩文件

8.5.解压nginx安装包

tar -zxvf nginx-1.14.2.tar.gz

8.6.进入解压的目录 cd nginx-1.14.2.tar.gz

./configure  
（默认是安装
在/usr/local/nginx
自定义安装目录
./configure --prefix=/home/nginx）

8.8.安装依赖

make && make install

结束......
```
#### nginx相关命令


-        cd /usr/local/nginx/sbin/（sbin目录）
-        ./nginx（启动）
-        ./nginx -s stop（停止）
-       ./nginx -s quit
-        ./nginx -s reload（改变配置文件重新启动）
#### nginx安装包解压目录
![image](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1561376081/nginx/nginx.jpg)
#### ./configure执行命令后目录
![image](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1561376288/nginx/nginx2.jpg)
- sbin:执行命令目录
- conf:配置文件
#### [AntD pro项目地址](http://129.28.65.95:9999)