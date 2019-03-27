---
title: Umijs
date: 2018-09-18 20:55:55
tags:
- Umijs
categories: 
- React技术栈
---

# UmiJS(核心：插件机制)

[UmiJS中文API官网](https://umijs.org/zh/)

#### 普通创建


安装国内源tyarn

- $ npm i yarn tyarn -g
- $ tyarn -v

安装umi

- $ tyarn global add umi
- $ umi -v

快速创建page（umi 里==约定==默认情况下 pages 下所有的 js 文件即路由）

- $ mkdir myapp && cd myapp
- $ umi g page index 

快速创建dva 的 model

- umi g dva:model foo

启动本地服务器

- $ umi dev

部署发布

- $ umi build

#### 通过脚手架创建项目

- $ mkdir myapp && cd myapp
- $ yarn create umi