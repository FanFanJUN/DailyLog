---
title: Git相关学习2
date: 2018-11-05 20:53:51
tags:
- Git
categories: 
- 工具
---

# Git常用命令


![image](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014061202.jpg)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库

#### git remote

```
查看所有远程主机名
$ git remote 
查看远程主机地址
$ git remote -v 
查看主机相关信息
$ git remote show <主机名>   
```
#### git clone

```
克隆远程主机下的分支
$ git clone -b <主机地址> <分支名>
```
#### git pull

```
取回远程主机某个分支的更新
$ git pull <主机名> <分支名>
```
#### git push

```
将本地分支的更新，推送到远程主机
$ git push <主机名> <分支名>
```
#### git merge

```
在本地分支上合并远程分支
$ git merge <主机名>/<分支名>
```


