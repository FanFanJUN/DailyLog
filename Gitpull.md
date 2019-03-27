---
title: 使用git pull文件时和本地文件冲突怎么办？
date: 2018-10-19 20:51:31
tags: Git
categories: 
- 工具
---

# Git冲突

#### 使用git pull文件时和本地文件冲突怎么办？


```
error: Your local changes to 'c/environ.c' would be overwritten by merge.  Aborting.
Please, commit your changes or stash them before you can merge.
```
更新下来的内容和本地修改的内容有冲突，先提交你的改变或者先将本地修改暂时存储起来。


```
场景一 
user0 有新提交
user1 没有pull -> 写新代码 -> pull -> 提示有冲突
```
```
解决办法一
-> stash save(把自己的代码隐藏存起来) -> 重新pull -> stash pop(把存起来的隐藏的代码取回来 ) -> 代码文件会显示冲突 -> 右键选择edit conficts，解决后点击编辑页面的 mark as resolved ->  commit&push
```
```
解决办法二(尽量少使用，这种方法的优点是在在原编辑器里处理冲突，代码逻辑看得更清楚一些)
-> stash save(把自己的代码隐藏存起来) -> 重新pull -> stash pop(把存起来的隐藏的代码取回来 ) -> 代码文件会显示冲突 -> 右键选择resolve conflict -> 打开文件解决冲突 -> commit&push
```
```
场景二
user0 有新提交
user1 没有pull -> 写新代码 -> commit&push -> 提示有冲突
```
```
解决办法一
-> pull -> 代码文件会显示冲突 -> 右键选择edit conficts，解决后点击编辑页面的 mark as resolved ->  commit&push
```



