

function loginSubmit(){
require(['bcrypt'], function(bcrypt) {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    //Test ID = 1002 Pass = Bacon554433////
    // 1056 1076 -> 1234
    var empNum = document.getElementById("inputEnum").value
    var empPass = document.getElementById("inputPassword").value
    if((empNum != '' && empNum != null) && (empPass != '' && empPass != null) ){
        db.transaction(function (tx) {
            tx.executeSql('SELECT passHash FROM employees WHERE employeeNumber = ?',[empNum],function (tx, results) {
                let len = results.rows.length;
                if(len > 0){
                    let passHash = results.rows.item(0).passHash
                    console.log(bcrypt.compareSync(empPass, passHash))
                    if(bcrypt.compareSync(empPass, passHash)){
                        // Create Cookie    
                        console.log("login_complete")
                        setCookie("empNum",empNum,1);
                                           
                       // location.href='admin.html'
                    }else{
                        // setCookie(empNum,"lop",0);
                         
                        console.log("password incorrect")
    
                    }                                      
                }else{
                        alert("Can't find user in database or Password not match!!")
                    }
                            
            })
        });
    }

});
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

    // setCookie("empNum",empNum,0);  ลบcookie
    // var bcrypt = require('./bcrypt');


    // for register page
    // var inputPass = "Bacon554433/\/\/\/" //Test
    // var empNum = 1002                    //Test
    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync(inputPass, salt);
    // var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    // db.transaction(function (tx) {
    //     tx.executeSql('UPDATE employees SET passHash = ? WHERE employeeNumber = ?',[hash,empNum]);
    // });



    // for login page
    // Test pass = Bacon554433/\/\/\/
   
     
    


