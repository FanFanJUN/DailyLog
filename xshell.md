---
title: xshell中配置Java环境以及常用命令
date: 2018-11-12 22:24:50
tags: Linux常用命令
---

# xshell中配置Java环境

#### 直接输入命令（JAVA_HOME为JDK的位置）
```
export JAVA_HOME=/usr/local/java/jdk1.8.0_131

export JRE_HOME=/usr/local/java/jdk1.8.0_131/jre

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib

export PATH=$JAVA_HOME/bin:$PATH
```
输入java -version有版本信息则成功

#### 部署中常用命令


```
启动项目
sh start.sh

停止
sh stop.sh

实时查看日志
tail -f logs/cims.log(日志位置)

查看所有进程
ps -ef|grep java

杀进程 
kill -9 端口号 
```
 
