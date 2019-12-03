
function loginSubmit() {
    require(['bcrypt'], function (bcrypt) {
        var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
        var empNum = document.getElementById("inputEnum").value
        var empPass = document.getElementById("inputPassword").value
        if ((empNum != '' && empNum != null) && (empPass != '' && empPass != null)) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT passHash, jobTitle FROM employees WHERE employeeNumber = ?', [empNum], function (tx, results) {
                    let len = results.rows.length;
                    if (len > 0) {
                        let passHash = results.rows.item(0).passHash
                        let jobtitle = results.rows.item(0).jobTitle
                        if (bcrypt.compareSync(empPass, passHash)) {
                            // Create Cookie    
                            // console.log("login_complete")
                            let saletitle = ""
                            setCookie("empNum", empNum, 1);
                            if(jobtitle.match(/Sales/g) != null){
                                saletitle = jobtitle.match(/Sales/g)[0]
                            }
                            
                            if(jobtitle == "VP Marketing"){
                                setCookie("title","VPMarketing",1);
                            }else if(saletitle == "Sales"){
                                setCookie("title","Sales",1);
                            }else{
                                setCookie("title","Alien",1);
                            }
                            location.href = 'orders.html'
                        } else {
                            // setCookie(empNum,empNum,0);
                            alert("Can't find user in database or Invalid Password")
                            // console.log("password incorrect")

                        }
                    } else {
                        alert("Can't find user in database or Invalid Password")
                    }

                })
            });
        }

    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function Enter_check(thisEvent) {
    if (thisEvent.keyCode == 13) { // enter key
        loginSubmit();
    }
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





