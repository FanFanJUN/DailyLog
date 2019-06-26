# 云服务器安装Java环境
#### 下载jdk并解压
[Java SE 8 Archive Downloads](https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

```
 tar -zxvf jdk-7u80-linux-x64.tar.gz
```


#### 直接输入命令（JAVA_HOME为JDK的位置）
```
export JAVA_HOME=/home/java/jdk1.7.0_80

export JRE_HOME=/home/java/jdk1.7.0_80/jre

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib

export PATH=$JAVA_HOME/bin:$PATH
```
#### 检验环境是否配置成功

```
[root@VM_0_8_centos ~]# java -version
java version "1.7.0_80"
Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)

```
