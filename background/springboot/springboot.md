# SpringBoot走过的坑
#### [Mybatis generator mapper文件重新生成不会覆盖原文件](https://blog.csdn.net/zengqiang1/article/details/79381418)

```
使用标题所述的generator，在生成xxxMapper.xml文件后
，再生成一次，新的内容会以追加的方式加入到原来的xxxMapper.xml文件中。
（通常我是希望覆盖的）
```

```
public class OverIsMergeablePlugin extends PluginAdapter {
    @Override
    public boolean validate(List<String> warnings) {
        return true;
    }

    @Override
    public boolean sqlMapGenerated(GeneratedXmlFile sqlMap, IntrospectedTable introspectedTable) {
        try {
            Field field = sqlMap.getClass().getDeclaredField("isMergeable");
            field.setAccessible(true);
            field.setBoolean(sqlMap, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }
}
```
配置generatorConfig.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<!-- 详细文档 http://www.mybatis.org/generator/configreference/xmlconfig.html -->
<generatorConfiguration>

    <properties resource="config.properties" />

    <context id="generatorContext" targetRuntime="${targetRuntime}">

        <plugin type="com.wql.customer.OverIsMergeablePlugin" />

        <commentGenerator type="com.wql.customer.CustomerCommentGenerator">
            <property name="suppressDate" value="false" />
            <property name="suppressAllComments" value="false" />
            <property name="addRemarkComments" value="true" />
            <property name="dateFormat" value="yyyy-MM-dd HH:mm:ss" />
        </commentGenerator>

        <jdbcConnection driverClass="${jdbc.driver}" connectionURL="${jdbc.url}" userId="${jdbc.username}" password="${jdbc.password}"></jdbcConnection>

        <javaTypeResolver>
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

        <javaModelGenerator targetPackage="${model.package}" targetProject="${target.project}">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <sqlMapGenerator targetPackage="${xml.package}" targetProject="${target.project.resources}">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>

        <javaClientGenerator targetPackage="${mapper.package}" targetProject="${target.project}" type="XMLMAPPER">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>

        <table tableName="${tableName}" domainObjectName="${domainObjectName}" enableCountByExample="${enableCountByExample}" enableUpdateByExample="${enableUpdateByExample}" enableDeleteByExample="${enableDeleteByExample}" enableSelectByExample="${enableSelectByExample}" selectByExampleQueryId="${selectByExampleQueryId}" />

    </context>
</generatorConfiguration>
```
#### springboot服务器部署

- 以jar包形式启动

```
maven中,直接install包
打包完成后 jar 包会生成到 target 目录下，命名一般是 项目名+版本号.jar
启动 jar 包命令(首先得在服务器安装Java环境)
# java -jar xxx.jar
这种方式，只要控制台关闭，服务就不能访问了。下面我们使用在后台运行的方式来启动:
意思是不挂断运行命令,当账户退出或终端关闭时,程序仍然运行
# nohup java -jar xxx.jar &
也可以在启动的时候选择读取不同的配置文件

java -jar xxx.jar --spring.profiles.active=dev
也可以在启动的时候设置 jvm 参数

java -Xms10m -Xmx80m -jar xxx.jar &

如何重启
简单粗暴

直接 kill 掉进程再次启动 jar 包

ps -ef|grep java 
#拿到对于Java程序的pid
kill -9 pid
# 再次重启
Java -jar  xxxx.jar
nohup java -jar xxx.jar &
杀掉进程
➜  ~ git:(master) ✗ kill -9 63539
➜  ~ git:(master) ✗ lsof -i :20080
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    97879   lc  110u  IPv6 0xca1b656b8226f30f      0t0  TCP *:20080 (LISTEN)
➜  ~ git:(master) ✗ kill -9 97879
```
- 2020317(脚本命令启动)

```
sh start.sh # 启动
sh stop.sh #停止
```
#### [springboot 打包时配置分离,依赖jar分离](https://my.oschina.net/u/1429362/blog/2967629) 
#### springboot集成druid
- 优点

```
1.Druid能够提供强大的监控和扩展功能
2.具有监控统计功能-内置监控页面支持jmx等
3.防御SQL注入攻击
4.可以日志记录JDBC执行的SQL
5.理论上说，支持所有有jdbc驱动的数据库
```
- 集成

```
1.引用jar包
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.21</version>
</dependency>
2. 添加配置
# 可视化界面匹配路径，默认druid
spring.datasource.druid.stat-view-servlet.url-pattern=/druid/*
# 最大线程数
spring.datasource.druid.max-active=10
# 初始化线程数
spring.datasource.druid.initial-size=1
# 是否开启可视化界面
spring.datasource.druid.stat-view-servlet.enabled=true
# 是否启用stat-filter
spring.datasource.druid.web-stat-filter.enabled=true
# 是否启用sql防火墙
spring.datasource.druid.filter.wall.enabled=true
# 只有配置了这个才能使用sql监控
spring.datasource.druid.filters=wall,stat
# 切面拦截的类包配置
spring.datasource.druid.aop-patterns=com.qlshouyu.framework.demo.controller.*
```
- 查看程序是否应用druid连接池

```
➜  springboot1111 git:(master) ✗ jps
41936 Jps
34248 Launcher
87832 
34249 SpringbootApplication
33997 RemoteMavenServer
➜  springboot1111 git:(master) ✗ jstack 34249|grep druid
        at com.alibaba.druid.pool.DruidDataSource$DestroyConnectionThread.run(DruidDataSource.java:2540)
        at com.alibaba.druid.pool.DruidDataSource$CreateConnectionThread.run(DruidDataSource.java:2443)
```
#### [Spring Boot最常用的3种读取properties配置文件中数据的方法：
](https://blog.csdn.net/dkbnull/article/details/81953190)
- 使用@Value注解读取
- 使用Environment读取
- 使用@ConfigurationProperties注解读取