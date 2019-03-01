package cn.xudazhu.bilibili.utils;

import java.io.PrintStream;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.logging.impl.LogFactoryImpl;

/**
 * 用log4j接管System.out
 *
 * @author xudaz
 * @date 2018/2/29
 */
public class Syso2Log4j implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent event) {
    }

    private void log(Object info) {
        LogFactoryImpl.getLog(this.getClass()).info(info);
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        PrintStream printStream = new PrintStream(System.out) {
            @Override
            public void println(boolean x) {
                log(x);
            }

            @Override
            public void println(char x) {
                log(x);
            }

            @Override
            public void println(char[] x) {
                log(x == null ? null : new String(x));
            }

            @Override
            public void println(double x) {
                log(x);
            }

            @Override
            public void println(float x) {
                log(x);
            }

            @Override
            public void println(int x) {
                log(x);
            }

            @Override
            public void println(long x) {
                log(x);
            }

            @Override
            public void println(Object x) {
                log(x);
            }

            @Override
            public void println(String x) {
                log(x);
            }
        };
        System.setOut(printStream);
        System.setErr(printStream);
    }

}
