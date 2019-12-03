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

    var user = getCookie("empNum");
    if (user == "") {
      if(this.location.pathname == '/login.html'){
        //do nothing
      }else{
        location.href = 'login.html'
      }
    }else {
      if(this.location.pathname == '/login.html'){
        location.href = 'orders.html'
      }
    }


    if(this.location.pathname == '/admin.html'){
      checktitleForEmployee('admin.html')
    }else if(this.location.pathname == '/stocks.html'){
      checktitleForStock('stocks.html')
    }


function checktitleForEmployee(site){
  var title = getCookie("title");
  if(title == "Sales"){
    if(this.location.pathname != '/admin.html'){
      location.href = '/' + site 
    }else{
      //do nothing
    }
  }else{
    if(this.location.pathname == '/admin.html'){
      location.href = '/orders.html'
      alert("Access Denied, Jobtile not 'sales' ")
    }else{
      alert("Access Denied, Jobtile not 'sales' ")
    }
  }
}
function checktitleForStock(site){
  var title = getCookie("title");
  if(title == "Sales"){
    if(this.location.pathname != '/stocks.html'){
      location.href = '/' + site 
    }else{
      //do nothing
    }
  }else{
    if(this.location.pathname == '/stocks.html'){
      location.href = '/orders.html'
      alert("Access Denied, Jobtile not 'sales' ")
    }else{
      alert("Access Denied, Jobtile not 'sales' ")
    }
  }
}


function checktitleForVPMarket(site){
  var title = getCookie("title");
  if(title == "VPMarketing"){
    if(this.location.pathname != '/coupons.html'){
      location.href = '/' + site 
    }else{
      //do nothing
    }
  }else{
    if(this.location.pathname == '/coupons.html'){
      location.href = '/orders.html'
      alert("Access Denied, Jobtile not 'VP Marketing' ")
    }else{
      alert("Access Denied, Jobtile not 'VP Marketing' ")
    }
  }
}


 //https://www.w3schools.com/js/js_cookies.asp

/*  Create Cookie
setCookie(ชื่อ,ผลลัพธ์,เวลา(วัน));

Delete Cookie
setCookie("empNum",empNum,0);
จะเปลียนค่าcookie ชื่อและผลลัพธ์ต้องตรงกัน */