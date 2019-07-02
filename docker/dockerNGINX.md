# docker安装NGINX
#### Docker 安装 Nginx

```
1.查找 Docker Hub 上的 nginx 镜像
[root@VM_0_8_centos ~]# docker search nginx

2.拉取官方的镜像
[root@VM_0_8_centos ~]# docker pull docker.io/nginx

3.使用 NGINX 默认的配置来启动一个 Nginx 容器实例
[root@VM_0_8_centos ~]# docker run --name dockernginx -p 8081:80 -d nginx
af7cf889f0c80b210f6f05d6934c796c828699d06eb5d121626b5991c2492439
# dockernginx 容器名称。
# -d设置容器在在后台一直运行。
# -p 端口进行映射，将本地 8081 端口映射到容器内部的 80 端口。

执行以上命令会生成一串字符串，类似 af7cf889f0c80b210f6f05d6934c796c828699d06eb5d121626b5991c2492439，这个表示容器的 ID，一般可作为日志的文件名。

4.docker ps 命令查看容器是否有在运行

[root@VM_0_8_centos ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
af7cf889f0c8        nginx               "nginx -g 'daemon ..."   2 minutes ago       Up 2 minutes        0.0.0.0:8081->80/tcp   dockernginx


```
输入服务器IP+端口访问
![image](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1561800873/docker/dockernginx.jpg)

#### nginx 部署
##### 1.创建挂载目录

```
[root@VM_0_8_centos ~]# mkdir -p /home/nginx/{conf,conf.d,html,logs}
或者
[root@VM_0_8_centos ~]# mkdir -p ~/nginx/html/dist ~/nginx/logs ~/nginx/conf
```
- html: 目录将映射为 nginx 容器配置的虚拟目录。
- logs: 目录将映射为 nginx 容器的日志目录。
- conf: 目录里的配置文件将映射为 nginx 容器的配置文件。
##### 2.拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录，容器 ID 可以查看 docker ps 命令输入中的第一列：


```
[root@VM_0_8_centos ~]# docker cp 157ac912736c:/etc/nginx/nginx.conf /home/nginx/conf
[root@VM_0_15_centos ~]# docker cp 157ac912736c:/etc/nginx/conf.d/default.conf /home/nginx/conf.d
```
/home/nginx/conf内容如下：
```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```
default.conf
```
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;#避免部分页面刷新404错误
    }

    location /api/lc/ {
            proxy_pass   http://129.28.167.200:20080;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;
            client_max_body_size 10m; #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，
            proxy_connect_timeout 90; #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_send_timeout 90; #后端服务器数据回传时间(代理发送超时)
            proxy_read_timeout 90; #连接成功后，后端服务器响应时间(代理接收超时)
            proxy_buffer_size 4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k; #proxy_buffers缓冲区，网页平均在32k以下的设置
            proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k;
            #设定缓存文件夹大小，大于这个值，将从upstream服务器传
        }
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


```

#### 3.部署命令

```
docker run -d -p 8888:80 --name nginxantd -v /home/nginx/html:/usr/share/nginx/html -v /home/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v  /home/nginx/logs:/var/log/nginx nginx
```
- -p 8082:80： 将容器的 80 端口映射到主机的 8082 端口。

- --name nginxantd：将容器命名为 nginxantd。

- -v ~/home/nginx/html:/usr/share/nginx/html：将我们自己创建的 html 目录挂载到容器的 /usr/share/nginx/html。

- -v ~/home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf：将我们自己创建的 nginx.conf 挂载到容器的 /etc/nginx/nginx.conf。

- -v ~/home/nginx/logs:/var/log/nginx：将我们自己创建的 logs 挂载到容器的 /var/log/nginx。

查看所有容器:
```
[root@VM_0_8_centos ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
b81aed7c737f        nginx               "nginx -g 'daemon ..."   3 minutes ago       Created                                    nginxantd
af7cf889f0c8        nginx               "nginx -g 'daemon ..."   5 hours ago         Up 5 hours          0.0.0.0:8081->80/tcp   dockernginx

```
- docker stop container-name 停止
- docker rm container-name 删除
- docker restart container-name 重启
#### 查看容器下目录

```
[root@VM_0_15_centos ~]# docker exec -it 40bc92da4c35 bash
root@40bc92da4c35:/# ls
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr

```
#### nginx配置文件修改reload

```
[root@VM_0_15_centos ~]# docker exec -it 40bc92da4c35 service nginx reload
[ ok ] Reloading nginx: nginx.

```


