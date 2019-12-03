function cart_Clear() {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM carts');
    });
    if(this.location.pathname == '/cart.html'){
        this.location.reload(true)
    }
    
}

function cart_Query() {
    const tableBody = document.querySelector('#TableBody')
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM carts', [], function (tx, results) {
            let len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                pCode = results.rows.item(i).productCode
                pName = results.rows.item(i).productName
                pVendor = results.rows.item(i).vendor
                pScale = results.rows.item(i).scale
                Pprice = results.rows.item(i).price
                pQty = results.rows.item(i).Qty
                let node = `
                <tr align="center">
                    <td class="product_name text-lg-center"><a>`+ pName + `</a></td>
                    <td class="product_text text-lg-center">`+ pVendor + `</td>
                    <td class="product_text text-lg-center">`+ pScale + `</td>
                    <td class="product_price product_text text-lg-center">$`+ Pprice + ` </td>
                    <td>
                        <div class="product_quantity_container">
                            <div class="product_quantity ml-lg-auto mr-lg-auto text-center">
                                <span class="product_text product_num" id="Qty`+ i + `">` + pQty + `</span>
                                <div class="qty_sub qty_button trans_200 text-center" onclick="SubQty(this)">
                                    <span>-</span>
                                </div>
                                <div class="qty_add qty_button trans_200 text-center" onclick="AddQty(this)">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><button type="button" class="btn btn-danger" onclick="cart_Delete(this)"> Remove </button>
                    <a style="display:none" id="pcode`+ i + `">` + pCode + `<a/>
                    </td>
                </tr>            
                `

                tableBody.insertAdjacentHTML('beforeend', node)
            }
        }, null);
    });
}

function cart_Delete(location) {
    const tableBody = document.querySelector('#TableBody');
    const delRow = location.parentNode.parentNode.rowIndex - 1;
    let pCode = location.nextSibling.nextSibling.textContent
    tableBody.deleteRow(delRow)
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM carts WHERE productCode = ?', [pCode]);
    });
}

function cart_Update() {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    let rowsLength = document.querySelector("#TableBody").rows.length
    db.transaction(function (tx) {
        for (i = 0; i < rowsLength; i++) {
            let pQty = document.getElementById("Qty" + i).textContent
            let pCode = document.getElementById("pcode" + i).textContent
            tx.executeSql('UPDATE carts SET Qty = ? WHERE productCode = ?', [pQty, pCode]);
        }
    });
    let discount = parseFloat(document.getElementById("DiscountAmt").textContent.replace("$", ''))
    db.transaction(function (tx) {
        tx.executeSql('SELECT price*Qty as Sum FROM carts', [], function (tx, results) {
            let len = results.rows.length, i;
            let subtotal = 0
            for (i = 0; i < len; i++) {
                subtotal += results.rows.item(i).Sum
            }
            let SumTotal = (discount + subtotal).toFixed(2)
            document.getElementById("cartTotal").textContent = "$" + SumTotal
        }, null);
    });

    
}
function cart_subtotal() {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT price*Qty as Sum FROM carts', [], function (tx, results) {
            let len = results.rows.length, i;
            let subtotal = 0
            for (i = 0; i < len; i++) {
                subtotal += results.rows.item(i).Sum
            }
            document.getElementById("subTotal").textContent = "$" + subtotal
        }, null);
    });
}

function cart_total() {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    let discount = parseFloat(document.getElementById("DiscountAmt").textContent.replace("$", '')).toFixed(2)
    db.transaction(function (tx) {
        tx.executeSql('SELECT price*Qty as Sum FROM carts', [], function (tx, results) {
            let len = results.rows.length, i;
            let subtotal = 0
            for (i = 0; i < len; i++) {
                subtotal += results.rows.item(i).Sum
            }
            let SumTotal = (subtotal - discount).toFixed(2)
            document.getElementById("cartTotal").textContent = "$" + SumTotal
        }, null);
    });
}
function cart_discount() {
    let discountCode = document.getElementById("DiscountCode").value
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    if(discountCode != ""){
    db.transaction(function (tx) {
        tx.executeSql('SELECT julianday("expiryDate")-julianday("now") as gap, discountAmount,timeCanUse FROM coupons WHERE discountCode = ?', [discountCode], function (tx, results) {
            let gap = results.rows.item(0).gap
            let time = results.rows.item(0).timeCanUse
            if (gap <= 0 || time <= 0) {
                document.getElementById("DiscountAmt").textContent = "$" + 0
            } else{
                let disAmt = results.rows.item(0).discountAmount
                document.getElementById("DiscountAmt").textContent = "$" + disAmt
            }
            let discount = parseFloat(document.getElementById("DiscountAmt").textContent.replace("$", '')).toFixed(2)
            tx.executeSql('SELECT price*Qty as Sum FROM carts', [], function (tx, results) {
                let len = results.rows.length, i;
                let subtotal = 0
                for (i = 0; i < len; i++) {
                    subtotal += results.rows.item(i).Sum
                }
                let SumTotal = (subtotal - discount).toFixed(2)
                document.getElementById("cartTotal").textContent = "$" + SumTotal
            }, null);
        }, null);
    });
}
}

function SubQty(location) {
    let originalValue = parseFloat(location.previousSibling.previousSibling.textContent)
    if (originalValue > 1) {
        newValue = originalValue - 1
    }
    location.previousSibling.previousSibling.textContent = newValue.toString()
}

function AddQty(location) {
    let originalValue = parseFloat(location.previousSibling.previousSibling.previousSibling.previousSibling.textContent)
    let newValue = originalValue + 1
    location.previousSibling.previousSibling.previousSibling.previousSibling.textContent = newValue.toString()
}

function get_custAddr(){
    let custNumber = document.getElementById("checkout_custNum").value
    let op1 = document.getElementById("checkout_ShipTo")
    let op2 = document.getElementById("checkout_BillTo")
    op1.innerHTML = "<option>Select</option>"
    op2.innerHTML = "<option>Select</option>"
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT addressNumber FROM customersAddresses WHERE customerNumber = ? AND DELETE_FLAG = "No"', [custNumber], function (tx, results) {
            let len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                let addrNum = results.rows.item(i).addressNumber
                let node = `
                <option>`+addrNum+`</option>
                `
                op1.insertAdjacentHTML('beforeend', node)
                op2.insertAdjacentHTML('beforeend', node)
            }

        }, null);
    });
}

function fillShipToLine(){
    let custNumber = document.getElementById("checkout_custNum").value
    let e = document.getElementById("checkout_ShipTo")
    let text = e.options[e.selectedIndex].text;
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customersAddresses WHERE customerNumber = ? AND addressNumber = ? AND DELETE_FLAG = "No"', [custNumber,text], function (tx, results) {
            let addr1 = results.rows.item(0).addressLine1
            let addr2 
            let addrState
            if(results.rows.item(0).addressLine2 != null){
               addr2 = results.rows.item(0).addressLine2 + ", "
            }else{
                addr2 = " "
            }
            let addrCity = results.rows.item(0).city + ", "
            if(results.rows.item(0).state != null){
                addrState = results.rows.item(0).state + ", "
             }else{
                 addrState = " "
             }
            let addrPostal = results.rows.item(0).postalCode + ", "
            let addrCountry = results.rows.item(0).country + " "
            document.getElementById("ShipToAddress").value = addr1+addr2+addrCity+addrState+addrPostal+addrCountry
        }, null);
    });
}

function fillBillToLine(){
    let custNumber = document.getElementById("checkout_custNum").value
    let e = document.getElementById("checkout_BillTo")
    let text = e.options[e.selectedIndex].text;
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM customersAddresses WHERE customerNumber = ? AND addressNumber = ? AND DELETE_FLAG = "No"', [custNumber,text], function (tx, results) {
            let addr1 = results.rows.item(0).addressLine1
            let addr2 
            let addrState
            if(results.rows.item(0).addressLine2 != null){
               addr2 = results.rows.item(0).addressLine2 + ", "
            }else{
                addr2 = " "
            }
            let addrCity = results.rows.item(0).city + ", "
            if(results.rows.item(0).state != null){
                addrState = results.rows.item(0).state + ", "
             }else{
                 addrState = " "
             }
            let addrPostal = results.rows.item(0).postalCode + ", "
            let addrCountry = results.rows.item(0).country + " "
            document.getElementById("BillToAddress").value = addr1+addr2+addrCity+addrState+addrPostal+addrCountry
        }, null);
    });
}

function place_order(){
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    let reqDate = ""
    let cNum = document.getElementById("checkout_custNum").value
    let e1 = document.getElementById("checkout_ShipTo")
    let textShipTo = e1.options[e1.selectedIndex].text;
    let e2 = document.getElementById("checkout_BillTo")
    let textBillTo = e2.options[e2.selectedIndex].text;
    let total = parseFloat(document.getElementById("cartTotal").textContent.replace("$","")).toFixed(2)
    let mpointGet = parseInt(3*(total / 100))
    let cpCode =document.getElementById("DiscountCode").value
    db.transaction(function (tx) {
        tx.executeSql('SELECT MAX(orderNumber) as MorderNum FROM orders', [], function (tx, results) {
            let orderNum = results.rows.item(0).MorderNum
            tx.executeSql('SELECT * FROM carts',[],function (tx, results) {
                let len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    let pcode = results.rows.item(i).productCode
                    let pQty = results.rows.item(i).Qty
                    let pPrice = results.rows.item(i).price
                    tx.executeSql('INSERT INTO orderdetails VALUES(?,?,?,?,1)',[orderNum,pcode,pQty,pPrice])
                    tx.executeSql('UPDATE products SET quantityInStock = quantityInStock - ? WHERE productCode = ?',[pQty,pcode])
                }
                tx.executeSql('INSERT INTO orders VALUE(?,DATE("now"),?,"-","In Process","-",?,?,?,?)',[orderNum,reqDate,cNum,mpointGet,textShipTo,textBillTo])
                tx.executeSql('UPDATE customers SET mPoint = mPoint + ?',[mpointGet])
                tx.executeSql('UPDATE coupons SET timeCanUse = timeCanUse - 1 WHERE discountCode = ?',[cpCode])
                cart_Clear()
            },null);
            
        }, null);
    });
}