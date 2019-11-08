  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

    var user = getCookie("username");
    if (user != "") {
      
    }else {
      location.href='login.html'
      // user = prompt("Please enter your name:", "");
      // if (user != "" && user != null) {
      //   setCookie("username", user, 365);
      // }
    }
  

 //https://www.w3schools.com/js/js_cookies.asp

/*  Create Cookie
setCookie(ชื่อ,ผลลัพธ์,เวลา(วัน));

Delete Cookie
setCookie("empNum",empNum,0);
จะเปลียนค่าcookie ชื่อและผลลัพธ์ต้องตรงกัน */