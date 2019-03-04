package cn.xudazhu.bilibili.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
/**
 * @author xudaz
 * @date 2018/2/29
 */
public class FormatMap {


    
    public static  Map<String, Object>  fomatRequestMap(Map<String, String[]> map ) {
        Map<String, Object> map1 = new HashMap<>(20);
        for (Entry<String, String[]> entry : map.entrySet()) {
            for (String value : entry.getValue()) {
                if ( ! "a_page_num".equals(entry.getKey()) && ! "page_num".equals(entry.getKey()) && ! "condition".equals(entry.getKey())  && ! "_method".equals(entry.getKey()) ) {
                    System.out.println(entry.getKey() +  ":" + value  );
                    String key = entry.getKey();
                    if ( key.contains("_") ) {
                        key = toUpperCaseFirst(key);
                    }
                    if ( key.endsWith("[]") ) {
                        key = key.substring(0, key.length()-2 ) ;
                        map1.put(key, value );
                    } else {
                        map1.put(key , value );
                    }
                }
            }
            
        }
        System.out.println("formatMap = " + map1);
        return map1;
    }


    /**
     * 把str "_" 后的首位转换成大写
     * @param str 要转换的str
     * @return 转换后的结果
     */
    public static String toUpperCaseFirst(String str) {
        if ( str == null || "".equals(str) ) {
            return  null;
        }
        String[] strings = str.split("_");
        StringBuilder temp = new StringBuilder(strings[0]);
        for (int i = 1; i < strings.length; i++) {
            char a  = 'a' , z = 'z';
            if ( strings[i].charAt(0) >= a && strings[i].charAt(0) <= z ) {
                char[] chars = strings[i].toCharArray();
                chars[0] = (char)(chars[0] - 32);
                strings[i] =   new String(chars);
            } else {
                strings[i] =   str;
            }
            temp.append(strings[i]);

        }
        return temp.toString();



    }


}
