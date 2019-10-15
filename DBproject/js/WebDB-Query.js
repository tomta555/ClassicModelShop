function showProducts(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var pname = "";
  var price = 0;
  var scale = "";
  var tagScaleDef = "sc1s";
  var pVendor = "";
  const list = document.querySelector('#productCat');
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        pname = results.rows.item(i).productName
        price = results.rows.item(i).MSRP
        scale = results.rows.item(i).productScale
        pVendor = results.rows.item(i).productVendor
        var splitScale = scale.split(":")
        var tagScale =  tagScaleDef + splitScale[splitScale.length-1] + " " + pVendor.replace(/\s/g, '');
        list.innerHTML += `
        <div class="product grid-item `+tagScale+`">
          <div class="product_inner">
            <div class="product_image">
              <img src="images/product_1.jpg" alt="">
              <div class="product_tag">`+scale+`</div>
            </div>
            <div class="product_content text-center">
              <div class="product_title" id="XXXX" ><a href="product.html">` + pname + `</a></div>
              <div class="product_price">`+ "$" + price + `</div>
              <div class="product_button ml-auto mr-auto trans_200"><a href="#">Add to cart</a></div>
            </div>
          </div>	
        </div>`;
      }
    }, null);
  });
}

function employeesQuery(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var enumber;
  var fname;
  var lname;
  var exten;
  var email;
  var office;
  var reportsto;
  var title;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM employees', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        enumber = results.rows.item(i).employeeNumber
        fname = results.rows.item(i).firstName
        lname = results.rows.item(i).lastName
        exten = results.rows.item(i).extension
        email = results.rows.item(i).email
        office = results.rows.item(i).officeCode
        reportsto = results.rows.item(i).reportsTo
        title = results.rows.item(i).jobTitle
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+enumber+`</td>
        <td>`+fname+`</td>
        <td>`+lname+`</td>
        <td>`+exten+`</td>
        <td>`+email+`</td>
        <td>`+office+`</td>
        <td>`+reportsto+`</td>
        <td>`+title+`</td>
      </tr>`;
      }
    }, null);
  });
}

function customerQuery(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var cNumber;
  var cName;
  var contactFName;
  var contactLname;
  var cPhone;
  var saleRep;
  var creditLimit;
  var memberPoint = 0;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM customers', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        cNumber = results.rows.item(i).customerNumber
        cName = results.rows.item(i).customerName
        contactLname = results.rows.item(i).contactLastName
        contactFName = results.rows.item(i).contactFirstName
        cPhone = results.rows.item(i).phone
        saleRep = results.rows.item(i).salesRepEmployeeNumber
        creditLimit = results.rows.item(i).creditLimit
        tableBody.innerHTML += `
        <tr align="center"> <!-- open1-->
        <td>`+cNumber+`</td>
        <td>`+cName+`</td>
        <td>`+contactLname+`</td>
        <td>`+contactFName+`</td>
        <td>`+cPhone+`</td>
        <td>`+saleRep+`</td>
        <td>`+creditLimit+`</td>
        <td>`+memberPoint+`</td>
        <td>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddressesModal" onclick=viewCustomerAddr(this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling)>
            View Addresses</button>
        </td>
        <td>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#HistoryModal">
            View History</button>
        </td>
      </tr> <!-- close1-->
      `;
      }
    }, null);
  });
}
function viewCustomerAddr(location){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var cNumber;
  var addrline1;
  var addrline2;
  var city;
  var state;
  var postalCode;
  var country;
  const cNum = location.textContent;
  // console.log(cNum)
  const viewAddr = document.querySelector('#viewAddresses');
  viewAddr.innerHTML ="";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM customersAddresses WHERE customerNumber = ?', [cNum], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        cNumber = results.rows.item(i).customerNumber
        addrline1 = results.rows.item(i).addressLine1
        addrline2 = results.rows.item(i).addressLine2
        city = results.rows.item(i).city
        state = results.rows.item(i).state
        postalCode = results.rows.item(i).postalCode
        country = results.rows.item(i).country
        viewAddr.innerHTML += `
        <tr align="center">
        <td>`+cNumber+`</td>
        <td>`+addrline1+`</td>
        <td>`+addrline2+`</td>
        <td>`+city+`</td>
        <td>`+state+`</td>
        <td>`+postalCode+`</td>
        <td>`+country+`</td>
      </tr>
      `;
      }
    }, null);
  });
}

function orderQuery(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var orderNumber;
  var orderDate;
  var requiredDate;
  var shippedDate;
  var status;
  var comments;
  var customerNumber;
  var memberPoint = 0;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orders', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        orderNumber = results.rows.item(i).orderNumber
        orderDate = results.rows.item(i).orderDate
        requiredDate = results.rows.item(i).requiredDate
        shippedDate = results.rows.item(i).shippedDate
        status = results.rows.item(i).status
        comments = results.rows.item(i).comments
        customerNumber = results.rows.item(i).customerNumber
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+orderNumber+`</td>
        <td>`+orderDate+`</td>
        <td>`+requiredDate+`</td>
        <td>`+shippedDate+`</td>
        <td>`+status+`</td>
        <td>`+customerNumber+`</td>
        <td>`+memberPoint+`</td>
      </tr>`;
      }
    }, null);
  });
}

function stocksQuery(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var productCode
  var productName
  var productScale
  var ProductDescription
  var quantityInStock
  var buyPrice
  var MSRP
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        productCode = results.rows.item(i).productCode
        productName = results.rows.item(i).productName
        productScale = results.rows.item(i).productScale
        ProductDescription = results.rows.item(i).ProductDescription
        quantityInStock = results.rows.item(i).quantityInStock
        buyPrice = results.rows.item(i).buyPrice
        MSRP = results.rows.item(i).MSRP
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+productCode+`</td>
        <td>`+productName+`</td>
        <td>`+productScale+`</td>
        <td>`+quantityInStock+`</td>
        <td>`+buyPrice+`</td>
        <td>`+MSRP+`</td>
      </tr>`;
      }
    }, null);
  });
}

function couponQuery(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var discountCode
  var discountAmount
  var timeCanUse
  var expiryDate
  var usedTime
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM coupons', [], function (tx, results) {
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        discountCode = results.rows.item(i).discountCode
        discountAmount = results.rows.item(i).discountAmount
        timeCanUse = results.rows.item(i).timeCanUse
        expiryDate = results.rows.item(i).expiryDate
        usedTime = results.rows.item(i).usedTime
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+(i+1)+`</td>
        <td>`+discountCode+`</td>
        <td>`+"$"+discountAmount+`</td>
        <td>`+timeCanUse+`</td>
        <td>`+expiryDate+`</td>
        <td>`+usedTime+`</td>
      </tr>`;
      }
    }, null);
  });
}
// function AddtoCart(){

//   }