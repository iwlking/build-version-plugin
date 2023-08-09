/*
 * @Description  : 公共函数
 * @Author       : wlking
 * @Date         : 2022-08-04 10:35:18
 * @LastEditTime : 2022-08-04 13:30:15
 * @LastEditors  : wlking
 * @FilePath     : \linkoffice-webpack-plugin\src\lib\utils.js
 */
function dateFormat (fmt, date) { //author: meizz 
  var o = {
    "M+": date.getMonth() + 1,     //月份 
    "d+": date.getDate(),     //日 
    "h+": date.getHours(),     //小时 
    "m+": date.getMinutes(),     //分 
    "s+": date.getSeconds(),     //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds()    //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}


export {
  dateFormat
}