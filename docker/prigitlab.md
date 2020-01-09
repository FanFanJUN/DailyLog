# [10分钟搭建自己的Git仓库](http://www.macrozheng.com/#/reference/gitlab?id=_10%e5%88%86%e9%92%9f%e6%90%ad%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84git%e4%bb%93%e5%ba%93)

#### [使用 Docker 搭建 GitLab](https://juejin.im/post/5cc1df885188252d6c43fd91)

#### 下载Gitlab的Docker镜像

```
[root@VM_0_15_centos ~]# docker pull gitlab/gitlab-ce
Using default tag: latest
Trying to pull repository docker.io/gitlab/gitlab-ce ... 
latest: Pulling from docker.io/gitlab/gitlab-ce
3386e6af03b0: Pull complete 
49ac0bbe6c8e: Pull complete 
d1983a67e104: Pull complete 
1a0f3a523f04: Pull complete 
8ed76f88ad05: Pull complete 
bbccdab10a0d: Pull complete 
a05715efb035: Pull complete 
a9a5bbc90d0d: Pull complete 
9e688ec091b5: Pull complete 
295af02ffab9: Pull complete 
Digest: sha256:731ee1179b3888e1c26ff6bb78ecb5f526f62167da631d56a63130106e1dce80
Status: Downloaded newer image for docker.io/gitlab/gitlab-ce:latest
```
#### 查看安装镜像

```
[root@VM_0_15_centos ~]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
docker.io/gitlab/gitlab-ce      latest              0bd11db0d775        5 days ago          1.84 GB
docker.io/nginx                 latest              719cd2e3ed04        7 months ago        109 MB
docker.io/portainer/portainer   latest              da2759008147        7 months ago        75.4 MB
docker.io/hello-world           latest              fce289e99eb9        12 months ago       1.84 kB
```
#### 运行如下命令来启动Gitlab

```
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 20099:80 --publish 22:22 \
  --name gitlabtest \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

```
$ sudo docker run --detach \
  --hostname gitlab.example.com \   # 设置主机名或域名
  --publish 443:443 --publish 20099:80 --publish 22:22 \ # 本地端口的映射
  --name gitlab \     # gitlab-ce 的镜像运行成为一个容器，这里是对容器的命名
  --restart always \  # 设置重启方式，always 代表一直开启，服务器开机后也会自动开启的
  --volume /srv/gitlab/config:/etc/gitlab \   # 将 gitlab 的配置文件目录映射到 /srv/gitlab/config 目录中
  --volume /srv/gitlab/logs:/var/log/gitlab \ # 将 gitlab 的log文件目录映射到 /srv/gitlab/logs 目录中
  --volume /srv/gitlab/data:/var/opt/gitlab \ # 将 gitlab 的数据文件目录映射到 /srv/gitlab/data 目录中
  gitlab/gitlab-ce:latest  # 需要运行的镜像

  
生成容器id
ec037d9682b02c311614d3bc9a0d0d2f719c77358b76637ad1d2ecae4797e52f
```
#### 查看端口监听情况

```
[root@VM_0_15_centos /]# sudo netstat -plntu
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:9999            0.0.0.0:*               LISTEN      12685/nginx: master 
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN      1/systemd           
tcp        0      0 0.0.0.0:20080           0.0.0.0:*               LISTEN      10980/java          
tcp        0      0 0.0.0.0:9527            0.0.0.0:*               LISTEN      12685/nginx: master 
tcp        0      0 0.0.0.0:8899            0.0.0.0:*               LISTEN      12685/nginx: master 
tcp6       0      0 :::3306                 :::*                    LISTEN      13297/mysqld        
tcp6       0      0 :::111                  :::*                    LISTEN      1506/rpcbind        
tcp6       0      0 :::8888                 :::*                    LISTEN      18287/docker-proxy- 
tcp6       0      0 :::33060                :::*                    LISTEN      13297/mysqld        
udp        0      0 0.0.0.0:68              0.0.0.0:*                           1821/dhclient       
udp        0      0 0.0.0.0:111             0.0.0.0:*                           1/systemd           
udp        0      0 172.30.0.15:123         0.0.0.0:*                           1498/ntpd           
udp        0      0 127.0.0.1:123           0.0.0.0:*                           1498/ntpd           
udp        0      0 0.0.0.0:830             0.0.0.0:*                           1506/rpcbind        
udp6       0      0 :::111                  :::*                                1506/rpcbind        
udp6       0      0 :::830                  :::*                                1506/rpcbind  
```
#### 开启防火墙的指定端口

```
# 开启1080端口
firewall-cmd --zone=public --add-port=1080/tcp --permanent 
# 重启防火墙才能生效
systemctl restart firewalld
# 查看已经开放的端口
firewall-cmd --list-ports
```
#### 可以通过docker命令动态查看容器启动日志来知道gitlab是否已经启动完成

```
docker logs gitlab -f
```

#### [开发者必备Docker命令](https://mp.weixin.qq.com/s/d_CuljDTJq680NTndAay8g)
#### [docker容器iptables failed: iptables --wait -t nat -A DOCKER&n](https://www.jianshu.com/p/4005b39aba55)