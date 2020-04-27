  //定义全局变量
  var app_key = "3b25e463cba41aa87f5973f4";
  var timestamp = new Date().valueOf();
  var random_str = "";
  var secret = "ef5be4360ec4af46202f02fc";
  var signature = "";

  //生成随机数
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

  //生成签名
    function Signatures() {
        random_str = randoms();
        var that = this;
        $.ajax({
            url: "https://192.168.0.170:443/web/common/md5/",
            // url: "https://192.168.0.129:443/web_war/common/md5/",
            method: "get",
            data: {
                appkey: app_key,
                timestamp: timestamp,
                randomStr: random_str,
                secret: secret
            },
            success: function(res) {
                signature = res.data;
                inIt();
            }
        })
    }

    function inIt() {
        JIM.loginOut();
        JIM.init({
                appkey: app_key,
                random_str: random_str,
                signature: signature,
                timestamp: timestamp,
                flag: 1
            })
            .onSuccess(function(data) {
                //data.code 返回码
                //data.message 描述
                console.log("初始化成功!", 111);
            })
            .onFail(function(data) {
                // 同上
                console.log("初始化失败", 111);
            });
  }
    Signatures();
