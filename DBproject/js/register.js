
function registerSubmit() {
    require(['bcrypt'], function (bcrypt) {
        // for register page
        var empNum = document.getElementById("inputEnum").value
        var empPass = document.getElementById("inputPassword").value
        var empconPass = document.getElementById("confirmPassword").value
        if (empPass != empconPass) {
            alert("Password not match")
        }
        else {
            if ((empNum != '' && empNum != null) && (empPass != '' && empPass != null)) {
                var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('SELECT passHash FROM employees WHERE employeeNumber = ?', [empNum],function (tx, results) {
                        let pass = results.rows.item(0).passHash
                        location.href='login.html'
                        if(pass != null){
                            alert("There exists password for this user")
                            throw new Error("There exists password for this user");
                            
                        }
                    })
                });
                //password still change when there exists one in the table
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(empPass, salt);
                db.transaction(function (tx) {
                    tx.executeSql('UPDATE employees SET passHash = ? WHERE employeeNumber = ?', [hash, empNum]);
                });
            }
        }
    });
}

