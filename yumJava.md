# 云服务器安装Java环境

## tar包
#### 下载jdk并解压
[Java SE 8 Archive Downloads](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

```
 tar -zxvf jdk-7u80-linux-x64.tar.gz
```


#### 环境配置（JAVA_HOME为JDK的位置）
```
vim ~/.bash_profile
文件内加上：
export JAVA_HOME=/home/jdk1.8.0_211

export JRE_HOME=/home/jdk1.8.0_211/jre

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib

export PATH=$JAVA_HOME/bin:$PATH

source ~/.bash_profile
使之生效
```
#### 检验环境是否配置成功

```
[root@VM_0_8_centos ~]# java -version
java version "1.7.0_80"
Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)

```

## [CentOS使用yum安装jdk](https://segmentfault.com/a/1190000015389941)
#### 查看yum包含的jdk版本
```
yum search java 或者 yum list java*
```
#### 安装jdk

```
yum install java-1.8.0-openjdk-devel.x86_64
```
#### 环境配置（JAVA_HOME为JDK的位置）
```
vim ~/.bash_profile
文件内加上：
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.171-8.b10.el6_9.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin

source ~/.bash_profile
使之生效
```
#### 检验环境是否配置成功

```
[root@VM_0_15_centos /]# java -version
openjdk version "1.8.0_232"
OpenJDK Runtime Environment (build 1.8.0_232-b09)
OpenJDK 64-Bit Server VM (build 25.232-b09, mixed mode)
```



