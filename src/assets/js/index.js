//毫秒数转日期
export function timeToLocaleString(item) {
  var obj = new Date(item);
  var getMonthValue = obj.getMonth() + 1;
  getMonthValue = getMonthValue >= 10 ? getMonthValue : "0" + getMonthValue;
  return obj.getFullYear() + "-" + getMonthValue + "-" + obj.getDate();
}

import md5 from "js-md5";
export function Signatures() {
  return new Promise((resolve, reject) => {
    var random_str = randoms();
    var app_key = "3b25e463cba41aa87f5973f4";
    var timestamp = new Date().valueOf();
    var secret = "ef5be4360ec4af46202f02fc";
    var signature = md5(
      `appkey=${app_key}&timestamp=${timestamp}&random_str=${random_str}&key=${secret}`
    );
    console.log(signature);
    if (signature) {
      JIM.init({
        appkey: app_key,
        random_str: random_str,
        signature: signature,
        timestamp: timestamp,
        flag: 1
      })
        .onSuccess(function(data) {
          console.log("初始化成功!");
          // JIM.loginOut();
        })
        .onFail(function(data) {
          console.log("初始化失败");
        });
    }
  });
}

// //生成随机数
function randoms() {
  var str = "",
    range = 20, //min
    arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
  // 随机产生
  if (true) {
    range = Math.round(Math.random() * (36 - 20)) + 20;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
