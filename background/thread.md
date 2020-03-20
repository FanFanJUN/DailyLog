# Java开启线程方式
- [原文](https://www.cnblogs.com/lgjava/p/9997126.html)
- 继承Thread类

```
步骤:

1):定义一个类A继承于Java.lang.Thread类.

2):在A类中覆盖Thread类中的run方法.

3):我们在run方法中编写需要执行的操作：run方法里的代码,线程执行体.

4):在main方法(线程)中,创建线程对象,并启动线程.

(1)创建线程类对象:                

A类   a  =  new   A类();

(2)调用线程对象的start方法:    

a.start();//启动一个线程

注意:千万不要调用run方法,如果调用run方法好比是对象调用方法,依然还是只有一个线程,并没有开启新的线程.

线程只能启动一次！
```

```
//1):定义一个类A继承于java.lang.Thread类.  
class MusicThread extends Thread{  
    //2):在A类中覆盖Thread类中的run方法.  
    public void run() {  
        //3):在run方法中编写需要执行的操作  
        for(int i = 0; i < 50; i ++){  
            System.out.println("播放音乐"+i);  
        }  
    }  
}  
  
public class ExtendsThreadDemo {  
    public static void main(String[] args) {  
          
        for(int j = 0; j < 50; j ++){  
            System.out.println("运行游戏"+j);  
            if(j == 10){  
                //4):在main方法(线程)中,创建线程对象,并启动线程.  
                MusicThread music = new MusicThread();  
                music.start();  
            }  
        }  
    }  
  
}
```

```
package app.creditapp.trade.Util;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.util.Iterator;
import java.util.Set;

import app.util.AppConfig;

public class CmsServer extends Thread {
	private static InetSocketAddress inetSocketAddress;
	private Handler handler = new HandlerImpl();
	
	private static String Address = AppConfig.getCmsServerIp();
	private static int port = AppConfig.getCmsServerPort();
	public CmsServer() {
		inetSocketAddress = new InetSocketAddress(Address, port);
	}

	public void run() {
		try {
			System.out.println("Server IP："+Address+"  local:"+InetAddress.getLocalHost().getHostAddress()+"|"+port);
			Selector selector = Selector.open(); // 打开选择器
			ServerSocketChannel serverSocketChannel = ServerSocketChannel.open(); // 打开通道
			serverSocketChannel.configureBlocking(false); // 非阻塞
			serverSocketChannel.socket();//bind(inetSocketAddress);
			serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT); // 向通道注册选择器和对应事件标识
			System.out.println("CmsServer Server: socket server started.");
			while (true) { // 轮询
				int nKeys = selector.select();
				if (nKeys > 0) {
					Set<SelectionKey> selectedKeys = selector.selectedKeys();//就绪通道
					Iterator<SelectionKey> it = selectedKeys.iterator();
					while (it.hasNext()) {
						SelectionKey key = it.next();
						if (key.isAcceptable()) { // 如果sk对应的通道包含客户端的连接请求  
							System.out.println("Server: SelectionKey is acceptable.");
							handler.handleAccept(key);
						} else if (key.isReadable()) { // 如果sk对应的通道有数据需要读取  
							System.out.println("Server: SelectionKey is readable.");
							handler.handleRead(key);
						} else if (key.isWritable()) { ////如果是通道写准备好事件 
							System.out.println("Server: SelectionKey is writable.");
							handler.handleWrite(key);
						}
						it.remove();
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		CmsServer server = new CmsServer();
		server.start();
	}
}

```
- 实现Runnable接口

```
步骤:

1):定义一个类A实现于java.lang.Runnable接口,注意A类不是线程类.

2):在A类中覆盖Runnable接口中的run方法.

3):我们在run方法中编写需要执行的操作：run方法里的,线程执行体.

4):在main方法(线程)中,创建线程对象,并启动线程.

     (1)创建线程类对象:

     Thread  t = new Thread(new  A());    

     (2)调用线程对象的start方法:

     t.start();
```

```
//1):定义一个类A实现于java.lang.Runnable接口,注意A类不是线程类.  
class MusicImplements implements Runnable{  
    //2):在A类中覆盖Runnable接口中的run方法.  
    public void run() {  
        //3):在run方法中编写需要执行的操作  
        for(int i = 0; i < 50; i ++){  
            System.out.println("播放音乐"+i);  
        }  
          
    }  
}  
  
public class ImplementsRunnableDemo {  
    public static void main(String[] args) {  
        for(int j = 0; j < 50; j ++){  
            System.out.println("运行游戏"+j);  
            if(j == 10){  
                //4):在main方法(线程)中,创建线程对象,并启动线程  
                MusicImplements mi = new MusicImplements();  
                Thread t = new Thread(mi);  
                t.start();  
            }  
        }  
    }  
  
}
```
