package cn.xudazhu.bilibili.utils;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * @author xudaz
 * @date 2018/2/29
 */
public class MyBeanUtils {
    private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    //传入含有键值对的map的list 和类对象 封装成该类的list

    /**
     * 传入含有键值对的map的list 封装成该类的list 此方法往往被用来封装mybatis从数据库查回的数据
     * 注意! 此方法没有值的类型检查 传入前请自行处理类型检查
     *
     * @param clazz1 要封装成的类的class对象
     * @param list   含有键值对的map集合的  list集合(每个map集合会被封装成一个对象)
     * @return 返回封装完成的list集合
     * @throws Exception Exception
     */
    public static <T> List<T> populateList(Class<T> clazz1, List<Map<Object, Object>> list) throws Exception {
        List<T> list2 = new ArrayList<>();
        for (Map<Object, Object> map : list) {
            T object = clazz1.newInstance();
            Method[] methods = object.getClass().getMethods();
            for (Entry<Object, Object> entry : map.entrySet()) {
                String parameter = entry.getKey().toString().toLowerCase();
                for (Method method : methods) {
                    String methodName = method.getName().toLowerCase();
                    if (methodName.startsWith("set") && methodName.substring(3).equals(parameter)) {
                        method.invoke(object, entry.getValue());
                    }
                }
            }
            list2.add(object);
        }
        return list2;

    }


    //传入参数map 和要set的bean

    /**
     * 此方法可以把一个map集合 封装到所传入的对象里
     *
     * @param object 被封装的对象
     * @param map    待封装的数据
     * @return 是否封装成功
     */
    public static Boolean populate(Object object, Map<Object, Object> map) {
        try {
            boolean populate1 = false;
            //获取传入对象的类对象
            Class<?> class1 = object.getClass();
            //用类对象获取全部方法的数组
            Method[] methods = class1.getMethods();
            //遍历map的key和value
            for (Entry<Object, Object> entry : map.entrySet()) {
                //获取key(转小写,好用来判断)
                String parameter = entry.getKey().toString().toLowerCase();
                //嵌套遍历所有方法
                for (Method method : methods) {
                    //获取方法名(转小写,好用来判断)
                    String methodName = method.getName().toLowerCase();
                    //如果方法名以set开头  判断截去"set"后是否与key匹配  
                    if (methodName.startsWith("set") && methodName.substring(3).equals(parameter)) {
                        //如果匹配 就执行set方法  把value传进去
                        invokeMethod(method, object, entry.getValue());
                        populate1 = true;
                    }
                }
            }

            return populate1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    //执行方法的函数

    /**
     * 执行方法的函数
     *
     * @param method 方法对象
     * @param object 调用这个方法的主体对象
     * @param arg    执行的方法所传入的参数
     * @throws Exception Exception
     */
    private static void invokeMethod(Method method, Object object, Object arg) throws Exception {
        System.out.println(method.getName());
        String type = method.getParameterTypes()[0].getName();
        if (String.class.getName().equals(type)) {
            method.invoke(object, (String) arg);
        } else if (Date.class.getName().equals(type)) {
            method.invoke(object, SDF.parse(arg.toString()));
        } else if (Integer.class.getName().equals(type)) {
            method.invoke(object, Integer.parseInt(arg.toString()));
        } else if (Long.class.getName().equals(type)) {
            method.invoke(object, Long.parseLong(arg.toString()));
        } else if (Float.class.getName().equals(type)) {
            method.invoke(object, Float.parseFloat(arg.toString()));
        } else if (Double.class.getName().equals(type)) {
            method.invoke(object, Double.parseDouble(arg.toString()));
        } else if (Boolean.class.getName().equals(type)) {
            method.invoke(object, Boolean.parseBoolean(arg.toString()));
        }


    }

}
