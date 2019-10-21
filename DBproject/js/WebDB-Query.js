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
        console.log(pVendor)
        list.innerHTML += `
        <div class="product grid-item `+tagScale+`">
          <div class="product_inner">
            <div class="product_image">
              <img src="images/`+pVendor.replace(/\s/g, '')+`.jpg">
              <div class="product_tag">`+scale+`</div>
            </div>
            <div class="product_content text-center">
              <div class="textBox">
              <div class="product_title"><a href="#">` + pname + `</a></div></div>
              <div class="product_price">`+ "$" + price + `</div>
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
  var contactLName;
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
        contactLName = results.rows.item(i).contactLastName
        contactFName = results.rows.item(i).contactFirstName
        cPhone = results.rows.item(i).phone
        saleRep = results.rows.item(i).salesRepEmployeeNumber
        creditLimit = results.rows.item(i).creditLimit
        memberPoint = results.rows.item(i).mPoint
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+cNumber+`</td>
        <td>`+cName+`</td>
        <td>`+contactLName+`</td>
        <td>`+contactFName+`</td>
        <td>`+cPhone+`</td>
        <td>`+saleRep+`</td>
        <td>`+creditLimit+`</td>
        <td>`+memberPoint+`</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddressesModal" onclick=viewCustomerAddr(this.parentNode.parentNode.firstChild.nextSibling)>
            View Addresses</button>
        </td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#HistoryModal" onclick=viewOrderedHistory(this.parentNode.parentNode.firstChild.nextSibling)>
            View History</button>
        </td>
      </tr>
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
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditModal" onclick="editCustomerAddr(this)">
        Edit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteCustomerAddr(this)">
        Delete</button></td>
        </tr>
      `;
      }
    }, null);
  });

  console.log(cNumber)
}

var editCusNum;
var initAddrLine1;

function editCustomerAddr(location){
  const editBody = document.querySelector('#editAddress')
  editCusNum = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  initAddrLine1 = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  editBody.innerHTML =`
  <tr>
  <td><input type="text" class="form-control" id="edit1"></td>
  <td><input type="text" class="form-control" id="edit2"></td>
  <td><input type="text" class="form-control" id="edit3"></td>
  <td><input type="text" class="form-control" id="edit4"></td>
  <td><input type="text" class="form-control" id="edit5"></td>
  <td><input type="text" class="form-control" id="edit6"></td>
</tr>
  `
  
  document.getElementById("edit1").value = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent
  document.getElementById("edit2").value = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
  document.getElementById("edit3").value = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
  document.getElementById("edit4").value = location.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent
  document.getElementById("edit5").value = location.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent
  document.getElementById("edit6").value = location.parentNode.previousSibling.previousSibling.textContent
}

function editAddressApply(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var initAddrLine11 = initAddrLine1;
  var cNumber = editCusNum;
  var addrline1 = document.getElementById("edit1").value
  var addrline2 = document.getElementById("edit2").value
  var city = document.getElementById("edit3").value
  var state = document.getElementById("edit4").value
  var postalCode = document.getElementById("edit5").value
  var country = document.getElementById("edit6").value
  db.transaction(function (tx) {
    tx.executeSql('UPDATE customersAddresses SET addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ? WHERE customerNumber = ? AND addressLine1 = ?', 
    [addrline1,addrline2,city,state,postalCode,country,cNumber,initAddrLine11]);
  });
}

function deleteCustomerAddr(location){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  const table = document.querySelector('#viewAddresses');
  const delRow = location.parentNode.parentNode.rowIndex - 1;
  editCusNum = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  initAddrLine1 = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  console.log()
  if(table.rows.length != 1){
    table.deleteRow(delRow)
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM customersAddresses WHERE customerNumber = ? AND addressLine1 = ?', [editCusNum,initAddrLine1]);
    });
  }
  

}

function viewOrderedHistory(location){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var orderNumber;
  var	orderDate;
  var	requiredDate;
  var	shippedDate;
  var	status;
  var customerNumber;
  var	memberPoint;
  const cNum = location.textContent;
  // console.log(cNum)
  const viewHistory = document.querySelector('#viewHistory');
  viewHistory.innerHTML ="";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orders WHERE customerNumber = ?', [cNum], function (tx, results) {
      var len = results.rows.length, i;
      if(len > 0){
        for (i = 0; i < len; i++) {
          orderNumber = results.rows.item(i).orderNumber
          orderDate = results.rows.item(i).orderDate
          requiredDate = results.rows.item(i).requiredDate
          shippedDate = results.rows.item(i).shippedDate
          status = results.rows.item(i).status
          customerNumber = results.rows.item(i).customerNumber
          memberPoint = results.rows.item(i).mPointGet
          viewHistory.innerHTML += `
          <tr align="center">
          <td>`+customerNumber+`</td>
          <td>`+orderNumber+`</td>
          <td>`+orderDate+`</td>
          <td>`+requiredDate+`</td>
          <td>`+shippedDate+`</td>
          <td>`+status+`</td>
          <td>`+memberPoint+`</td>
          <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentModal" onclick="viewComment(this.parentNode.parentNode.firstChild.nextSibling)">
        View comments</button></td>
        </tr>
        `;
        } 
      }else{
        viewHistory.innerHTML += `<h1 align="center">No Data</h1>`
      }
    }, null);
  });
}

function viewComment(location){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var comments;
  const cNum = location.textContent;
  const orderNum = location.nextSibling.nextSibling.textContent;
  const viewComment = document.querySelector('#viewComment');
  db.transaction(function (tx) {
    tx.executeSql('SELECT comments FROM orders WHERE customerNumber = ? AND orderNumber = ?', [cNum,orderNum], function (tx, results) {
          comments = results.rows.item(0).comments
          viewComment.innerHTML = `
          <p>
          `+comments+`
          </p>
        `;
        
    }, null);
  });
}

function addCustomer(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var cNumber = document.getElementById("cNum").value;
  var cName = document.getElementById("cName").value;
  var contactFName = document.getElementById("cFName").value;
  var contactLName = document.getElementById("cLName").value;
  var cPhone = document.getElementById("cPhone").value;
  var addrline1 = document.getElementById("cAddr1").value;
  var addrline2 = document.getElementById("cAddr2").value;
  var city = document.getElementById("cCity").value;
  var state = document.getElementById("cState").value;
  var postalCode = document.getElementById("cPostal").value;
  var country = document.getElementById("cCountry").value;
  var saleRep = document.getElementById("cRep").value;
  var creditLimit = document.getElementById("cCredit").value;
  var memberPoint = 0;
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [cNumber,cName,contactLName,contactFName,cPhone,saleRep,creditLimit,memberPoint]); 
    tx.executeSql('INSERT INTO customersAddresses VALUES (?, ?, ?, ?, ?, ?, ?)', [cNumber,addrline1,addrline2,city,state,postalCode,country]); 
  });
}

function addCustomerAddress(){
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  var cNumber = document.getElementById("cNum2").value;
  var addrline1 = document.getElementById("cAddr1-2").value;
  var addrline2 = document.getElementById("cAddr2-2").value;
  var city = document.getElementById("cCity2").value;
  var state = document.getElementById("cState2").value;
  var postalCode = document.getElementById("cPostal2").value;
  var country = document.getElementById("cCountry2").value;
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO customersAddresses VALUES (?, ?, ?, ?, ?, ?, ?)', [cNumber,addrline1,addrline2,city,state,postalCode,country]); 
  });

}

function clearAddAddrForm(){
  document.getElementById("cNum2").value = "";
  document.getElementById("cAddr1-2").value = "";
  document.getElementById("cAddr2-2").value = "";
  document.getElementById("cCity2").value = "";
  document.getElementById("cState2").value = "";
  document.getElementById("cPostal2").value = "";
  document.getElementById("cCountry2").value = "";
}

function clearAddMemberForm(){
  document.getElementById("cNum").value = "";
  document.getElementById("cName").value = "";
  document.getElementById("cFName").value = "";
  document.getElementById("cLName").value = "";
  document.getElementById("cPhone").value = "";
  document.getElementById("cAddr1").value = "";
  document.getElementById("cAddr2").value = "";
  document.getElementById("cCity").value = "";
  document.getElementById("cState").value = "";
  document.getElementById("cPostal").value = "";
  document.getElementById("cCountry").value = "";
  document.getElementById("cRep").value = "";
  document.getElementById("cCredit").value = "";
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
  var memberPoint;
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
        memberPoint = results.rows.item(i).mPointGet
        tableBody.innerHTML += `
        <tr align="center">
        <td>`+orderNumber+`</td>
        <td>`+orderDate+`</td>
        <td>`+requiredDate+`</td>
        <td>`+shippedDate+`</td>
        <td>`+status+`</td>
        <td>`+customerNumber+`</td>
        <td>`+memberPoint+`</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="">
        View Comments</button></td>
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
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="">
        Product Description</button></td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="">
        Edit</button></td>
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

function tableSearch() {
  // Declare variables
  var $rows = $('#TableBody tr');
  $('#quicksearch').keyup(debounce(function() {
  
    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;
  
    $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
    }).hide();
  }, 300));
  
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
}

// function AddtoCart(){

//   }