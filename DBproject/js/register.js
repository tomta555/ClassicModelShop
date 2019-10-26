
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
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(empPass, salt);
                var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql('UPDATE employees SET passHash = ? WHERE employeeNumber = ?', [hash, empNum]);
                });
            }
        }
    });
}

