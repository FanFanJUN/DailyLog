### maven详解

#### 通用目录结构

```
${basedir}
|-- pom.xml
|-- src
|   |-- main
|   |   `-- java
|   |   `-- resources
|   |   `-- filters
|   `-- test
|   |   `-- java
|   |   `-- resources
|   |   `-- filters
|   `-- it
|   `-- assembly
|   `-- site
`-- LICENSE.txt
`-- NOTICE.txt
`-- README.txt
```

#### pom.xml文件

```
<project xmlns = "http://maven.apache.org/POM/4.0.0"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
 
    <!-- 模型版本 -->
    <modelVersion>4.0.0</modelVersion>
    <!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 如com.companyname.project-group，maven会将该项目打成的jar包放本地路径：/com/companyname/project-group -->
    <groupId>com.companyname.project-group</groupId>
 
    <!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 
    groupId 和 artifactId 一起定义了 artifact 在仓库中的位置。-->
    <artifactId>project</artifactId>
 
    <!-- 版本号 -->
    <version>1.0</version>
</project
```
- 所有的 POM 文件需要 project 元素和三个必须的字段：groupId, artifactId,version。
- 在仓库中的工程标识为 groupId:artifactId:version
POM.xml 的根元素是 project，它有三个主要的子节点：

### build 标签

```
pom.xml 中的 build 标签是用于配置 pom 的， 
相当于 pom 的 configuration，主要用于： 

1、定义（或声明）项目的目录结构 
2、使用maven的插件（maven plugins）。
```

```
Build 标签也分为两种： 
        1、project build 
                针对整个项目的所有情况都有效。该配置可以被 profile 全部继承。 
        2、profile build 
                用于重写覆盖掉 project build 中的配置。 
                是 project build 的子集。

<project xmlns="http://maven.apache.org/POM/4.0.0"    
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"    
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0    
                      http://maven.apache.org/maven-v4_0_0.xsd">    
  
  <!–- "Project Build" 除了包含 BaseBuild 集合外，还包含其它构建元素 -–>   
  <build>…</build>    
  
  <!–- "Profile Build" 是 "Project Build"s 的子集 -–>   
  <profiles>    
    <profile>  
      <build>…</build>    
    </profile>    
  </profiles>    
</project>   
```
- [Maven之POM之<build>标签详解](https://lixh1986.iteye.com/blog/2382352)
- [org.polago.maven.plugins---合并多个配置文件至一个文件](https://www.polago.org/merge-properties-maven-plugin/usage.html)

```
Merge Properties Maven Plugin is a Maven Plugin that merges and filters a set of Java Properties files into a single file while detecting multiple instances of the same Property Key.
Maven的Assembly Plugin主要用于允许用户将项目输出及其依赖项，模块，站点文档和其他文件聚合到一个可分发的归档中
```
```
<plugin>
  <groupId>org.polago.maven.plugins</groupId>
  <artifactId>merge-properties-maven-plugin</artifactId>
  <version>1.1</version>
  <configuration>
    <outputDirectory>${project.build.directory}/generated-resources</outputDirectory>
  </configuration>
  <executions>
    <execution>
      <id>merge-en</id>
      <goals>
        <goal>merge</goal>
      </goals>
      <configuration>
        <outputFile>Resources_en.properties</outputFile>
        <resources>
          <resource>
            <directory>src/main/properties</directory>
            <filtering>true</filtering>
            <includes>
              <include>**/*_en.properties</include>
            </includes>
          </resource>
        </resources>
      </configuration>
    </execution>
    <execution>
      <id>merge-sv</id>
      <goals>
        <goal>merge</goal>
      </goals>
      <configuration>
        <outputFile>Resources_sv.properties</outputFile>
        <resources>
          <resource>
            <directory>src/main/properties</directory>
            <filtering>true</filtering>
            <includes>
              <include>**/*_sv.properties</include>
            </includes>
          </resource>
        </resources>
      </configuration>
    </execution>
  </executions>
</plugin>
```
#### classpath路径指什么

```
编译之后的classes或者test-classes目录
classpath 和 classpath* 区别：
classpath：只会到你的class路径中查找找文件;
classpath*：不仅包含class路径，还包括jar文件中(class路径)进行查找。

```
- [Apache Maven Assembly Plugin](http://maven.apache.org/plugins/maven-assembly-plugin/index.html)
![image](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1564490821/Apache_Maven_Assembly_Plugin.png)

```
<plugin>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.3</version>
    <configuration>
        <descriptors> <!--自定义配置，描述文件路径-->
            <descriptor>src/main/assembly/assembly.xml</descriptor>
        </descriptors>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>

```
### assembly.xml配置

```
<assembly xmlns="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0 http://maven.apache.org/xsd/assembly-1.1.0.xsd">
    <id>web</id>
    <formats>
        <format>war</format>
        <!--生成同结构的目录, 方便查看, 可选-->
        <format>dir</format>
    </formats>
    <includeBaseDirectory>false</includeBaseDirectory>
    <!--打war包的文件配置-->
    <fileSets>
        <fileSet>
            <directory>${project.build.outputDirectory}</directory>
            <outputDirectory>WEB-INF/classes</outputDirectory>
        </fileSet>
        <!--分环境打包配置文件-->
        <!-- ${env} 的值由 -P 的参数传递进来, 如：-Pdev, 那么, ${env} 的值就是 dev -->
        <fileSet>
            <directory>${project.basedir}/src/main/assembly/${env}</directory>
            <outputDirectory>WEB-INF/classes</outputDirectory>
        </fileSet>
        <!--公共配置文件-->
        <fileSet>
            <directory>${project.basedir}/src/main/resources</directory>
            <outputDirectory>WEB-INF/classes</outputDirectory>
        </fileSet>
        <!-- 将 webapp 下的文件输出到 WAR 包 -->
        <fileSet>
            <directory>${project.basedir}/src/main/webapp</directory>
            <outputDirectory>/</outputDirectory>
        </fileSet>
    </fileSets>
    <dependencySets>
        <!-- 将项目依赖的JAR包输出到 WEB-INF/lib -->
        <dependencySet>
            <outputDirectory>WEB-INF/lib</outputDirectory>
            <!--经测试可以不需要-->
            <!--<excludes>-->
                <!--<exclude>*.war</exclude>-->
            <!--</excludes>-->
            <useProjectArtifact>false</useProjectArtifact>
        </dependencySet>
    </dependencySets>
</assembly>
```


- [maven-assembly-plugin 入门指南](https://www.jianshu.com/p/14bcb17b99e0)
- [maven-assembly-plugin的详细使用](https://blog.wfyvv.com/archives/25.html)
- [利用assembly插件分环境打包配置文件](https://www.jianshu.com/p/7e7c7c95ff13)

### maven多项目资源共享maven-remote-resources-plugin

```
资源端：
<!-- https://stackoverflow.com/questions/2362652/excluding-classes-in-maven-checkstyle-plugin-reports -->
                <!-- https://stackoverflow.com/questions/14117709/configuring-maven-to-generate-output-outside-the-project-directory -->
                <!-- https://blog.sonatype.com/2008/04/how-to-share-resources-across-projects-in-maven/ -->
                <!-- http://maven.apache.org/plugins/maven-remote-resources-plugin/examples/sharing-resources.html -->
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-remote-resources-plugin</artifactId>
                    <version>${maven-remote-resources-plugin.version}</version>
                    <executions>
                        <execution>
                            <goals>
                                <goal>bundle</goal>
                            </goals>
                        </execution>
                    </executions>
                    <configuration>
                        <includes>
                            <include>**/*</include>
                        </includes>
                    </configuration>
                </plugin>
```

```
引用端：
<plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-remote-resources-plugin</artifactId>
                    <version>${maven-remote-resources-plugin.version}</version>
                    <configuration>
                        <resourceBundles>
                            <resourceBundle>com.laplace:laplace:${project.version}</resourceBundle>
                        </resourceBundles>
                    </configuration>
                    <executions>
                        <execution>
                            <goals>
                                <goal>process</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
```
#### maven项目pom.xml中parent标签的使用

```
使用maven是为了更好的帮项目管理包依赖，maven的核心就是pom.xml。当我们需要引入一个jar包时，在pom文件中加上<dependency></dependency>就可以从仓库中依赖到相应的jar包。

现在有这样一个场景，有两个web项目A、B，一个java项目C，它们都需要用到同一个jar包：common.jar。如果分别在三个项目的pom文件中定义各自对common.jar的依赖，那么当common.jar的版本发生变化时，三个项目的pom文件都要改，项目越多要改的地方就越多，很麻烦。这时候就需要用到parent标签, 我们创建一个parent项目，打包类型为pom，parent项目中不存放任何代码，只是管理多个项目之间公共的依赖。在parent项目的pom文件中定义对common.jar的依赖，ABC三个子项目中只需要定义<parent></parent>，parent标签中写上parent项目的pom坐标就可以引用到common.jar了。

上面的问题解决了，我们在切换一个场景，有一个springmvc.jar，只有AB两个web项目需要，C项目是java项目不需要，那么又要怎么去依赖。如果AB中分别定义对springmvc.jar的依赖，当springmvc.jar版本变化时修改起来又会很麻烦。解决办法是在parent项目的pom文件中使用<dependencyManagement></dependencyManagement>将springmvc.jar管理起来，如果有哪个子项目要用，那么子项目在自己的pom文件中使用

<dependency>

<groupId></groupId>

<artifactId></artifactId>

</dependency>

标签中写上springmvc.jar的坐标，不需要写版本号，可以依赖到这个jar包了。这样springmvc.jar的版本发生变化时只需要修改parent中的版本就可以了。
```