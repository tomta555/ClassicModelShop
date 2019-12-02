function cart_Clear() {
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM carts');
    });
    this.location.reload(true)
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
    let discount = parseFloat(document.getElementById("DiscountAmt").textContent.replace("$", ''))
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
    db.transaction(function (tx) {
        tx.executeSql('SELECT julianday("expiryDate")-julianday("now") as gap, discountAmount FROM coupons WHERE discountCode = ?', [discountCode], function (tx, results) {
            let gap = results.rows.item(0).gap
            if (gap <= 0) {
                document.getElementById("DiscountAmt").textContent = "$" + 0
            } else {
                let disAmt = results.rows.item(0).discountAmount
                document.getElementById("DiscountAmt").textContent = "$" + disAmt
            }
            let discount = parseFloat(document.getElementById("DiscountAmt").textContent.replace("$", ''))
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