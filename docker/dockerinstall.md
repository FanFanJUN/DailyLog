# 云服务器&&docker

#### 命令查看你当前的内核版本

```
uname -r

Docker 要求 CentOS 系统的内核版本高于 3.10
```
#### 查看yum的版本信息命令

```
yum info
```
#### 查看内核版本

```
[root@VM_0_15_centos ~]# cat /etc/redhat-release
CentOS Linux release 7.6.1810 (Core) 
```


#### docker安装

```
安装
yum install docker

安装完成后，使用下面的命令来启动 docker 服务，并将其设置为开机启动：
service docker start
chkconfig docker on

输入上述命令，返回docker的版本相关信息，证明docker安装成功。
docker version

Docker 中国官方镜像加速配置
vi  /etc/docker/daemon.json
#添加后
{"registry-mirrors": ["https://registry.docker-cn.com"],
    "live-restore": true}

```
#### 重要:docker第一次run问题解决

```
/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\"".

主要原因还是centos系统版本兼容性问题，如果将系统做更新升级，即可解决。运行下

yun update

```
![docker](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1561798443/docker/docker.jpg)

#### docker相关命令

```
启动        systemctl start docker
守护进程重启   sudo systemctl daemon-reload
重启docker服务   systemctl restart  docker
重启docker服务  sudo service docker restart
关闭docker   service docker stop   
关闭docker  systemctl stop docker
--------------------- 
```

#### docker卸载

```
1、查看安装过的docker：yum list installed | grep docker

[root@VM_0_8_centos ~]# yum list installed | grep docker
docker.x86_64                        2:1.13.1-96.gitb2f74b2.el7.centos @extras  
docker-client.x86_64                 2:1.13.1-96.gitb2f74b2.el7.centos @extras  
docker-common.x86_64                 2:1.13.1-96.gitb2f74b2.el7.centos @extras 

2、卸载docker：yum remove -y docker-ce.x86_64

3、删除容器镜像：rm -rf /var/lib/docker
```

```
[root@VM_0_8_centos ~]# rm -rf /var/lib/docker/
rm: cannot remove ‘/var/lib/docker/containers’: Device or resource busy
rm: cannot remove ‘/var/lib/docker/overlay2’: Device or resource busy

[root@VM_0_8_centos ~]# umount /var/lib/docker/containers
[root@VM_0_8_centos ~]# umount /var/lib/docker/overlay2
卸载后再删除
```
#### 常用命令

```
拉取docker镜像
docker pull image_name

查看宿主机上的镜像，Docker镜像保存在/var/lib/docker目录下:
docker images

删除镜像
docker rmi  docker.io/tomcat:7.0.77-jre7   或者  docker rmi b39c68b7af30

查看当前有哪些容器正在运行
docker ps

查看所有容器
docker ps -a

启动、停止、重启容器命令：
docker start container_name/container_id
docker stop container_name/container_id
docker restart container_name/container_id

后台启动一个容器后，如果想进入到这个容器，可以使用attach命令：
docker attach container_name/container_id

删除容器的命令：
docker rm container_name/container_id

删除所有停止的容器：
docker rm $(docker ps -a -q)

查看当前系统Docker信息
docker info

从Docker hub上下载某个镜像:
docker pull centos:latest
docker pull centos:latest

查找Docker Hub上的nginx镜像
docker search nginx
```

#### docker 镜像启动成功但是无法访问解决方法

```
vi /etc/sysctl.conf

net.ipv4.ip_forward=1

重启
systemctl restart network

```
#### docker图形化界面Portainer安装

```
[root@VM_0_15_centos ~]# docker search docker

[root@VM_0_15_centos ~]# docker pull docker.io/portainer/portainer

[root@VM_0_15_centos ~]# docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
35b9a71f48db21300dc78dfea2d4705dcc9e82e9e396f47632efa4d839f8b858

```
![portainer](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1562071480/docker/portainer.jpg)

#### [阮一峰docker入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
#### [菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)