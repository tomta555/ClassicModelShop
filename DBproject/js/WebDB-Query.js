
function showProducts() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let pname = "";
  let price = 0;
  let scale = "";
  let tagScaleDef = "sc1s";
  let pVendor = "";
  let list = document.querySelector('#productCat');
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        pname = results.rows.item(i).productName
        price = results.rows.item(i).MSRP
        scale = results.rows.item(i).productScale
        pVendor = results.rows.item(i).productVendor
        let splitScale = scale.split(":")
        let tagScale = tagScaleDef + splitScale[splitScale.length - 1] + " " + pVendor.replace(/\s/g, '');
        let node = `
        <div class="product grid-item `+ tagScale + `">
          <div class="product_inner">
            <div class="product_image">
              <img src="images/`+ pVendor.replace(/\s/g, '') + `.jpg">
              <div class="product_tag">`+ scale + `</div>
            </div>
            <div class="product_content text-center">
              <div class="textBox">
              <div class="product_title"><a href="#">` + pname + `</a></div></div>
              <div class="product_price">`+ "$" + price + `</div>
            </div>
          </div>	
        </div>`;
        list.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function employeesQuery() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let enumber;
  let fname;
  let lname;
  let exten;
  let email;
  let office;
  let reportsto;
  let title;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    var ps = getCookie("empNum")
    tx.executeSql('SELECT * FROM employees WHERE reportsTo = ? ', [ps], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        enumber = results.rows.item(i).employeeNumber
        fname = results.rows.item(i).firstName
        lname = results.rows.item(i).lastName
        exten = results.rows.item(i).extension
        email = results.rows.item(i).email
        office = results.rows.item(i).officeCode
        reportsto = results.rows.item(i).reportsTo
        title = results.rows.item(i).jobTitle
        let node = `
        <tr align="center">
        <td>`+ enumber + `</td>
        <td>`+ fname + `</td>
        <td>`+ lname + `</td>
        <td>`+ exten + `</td>
        <td>`+ email + `</td>
        <td>`+ office + `</td>
        <td>`+ reportsto + `</td>
        <td>`+ title + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#employeeEditModal" onclick="editEmployee(this)">
        Edit</button></td>
      </tr>`;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function employeeStatus() {
  
  let enumber;
  let fname;
  let lname;
  let exten;
  let email;
  let title;
  const Body = document.querySelector('#statusemployee')
  Body.innerHTML=""
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    var ps = getCookie("empNum")
    tx.executeSql('SELECT * FROM employees WHERE employeeNumber = ? ', [ps], function (tx, results) {
      let len = results.rows.length, i=0;
        enumber = results.rows.item(i).employeeNumber
        fname = results.rows.item(i).firstName
        lname = results.rows.item(i).lastName
        exten = results.rows.item(i).extension
        email = results.rows.item(i).email
        title = results.rows.item(i).jobTitle
        let node = `        
        <font size = 4 ; ><b>`+"EmployeeID  :  "+`</b><i>`+ enumber + `</i><br>
        <b>`+"FirstName  :  "+`</b><i>`+ fname + `</i><br>
        <b>`+"LastName  :  "+`</b><i>`+ lname + `</i><br>
        <b>`+"Exten  :  "+`</b><i>`+ exten + `</i><br>
        <b>`+"Email  :  "+`</b><i>`+ email + `</i><br>
        <b>`+ "JobTitle  :  "+`</b><i>` + title + `</i></font>`;
        Body.insertAdjacentHTML('beforeend', node)
      
    }, null);
  });
}


function employeeEdit(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let enumber;
  let fname;
  let lname;
  let exten;
  let email;
  let office;
  let reportsto;
  let title;
  let Enumbers = location.parentNode.parentNode.firstChild.nextSibling.textContent
  const tableBody = document.querySelector('#editemployee')
  tableBody.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM employees WHERE employeeNumber = ?', [Enumbers], function (tx, results) {
      enumber = results.rows.item(0).employeeNumber
      fname = results.rows.item(0).lastName
      lname = results.rows.item(0).firstName
      exten = results.rows.item(0).extension
      email = results.rows.item(0).email
      office = results.rows.item(0).officeCode
      reportsto = results.rows.item(0).reportsTo
      title = results.rows.item(0).jobTitle
      let node = `
        <tr align="center">
        <td>`+ enumber + `</td>
        <td>`+ fname + `</td>
        <td>`+ lname + `</td>
        <td>`+ exten + `</td>
        <td>`+ email + `</td>
        <td>`+ office + `</td>
        <td>`+ reportsto + `</td>
        <td>`+ title + `</td>
      </tr>`;
      tableBody.insertAdjacentHTML('beforeend', node)

    }, null);
  });
}

function addEmployee() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let employeeNumber = document.getElementById("enumber").value;
  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let extension = document.getElementById("exten").value;
  let email = document.getElementById("email").value;
  let officeCode = document.getElementById("office").value;
  let reportTo = document.getElementById("reportsto").value;
  let jobTitle = document.getElementById("title").value;
  let passHash = "No"
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [employeeNumber, lastName, firstName, extension, email, officeCode, reportTo, jobTitle, passHash]);
  });
}

function editEmployee(location) {
  const editBody = document.querySelector('#editemployee')
  edEmployee = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  edmail = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  edTitle = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  editBody.innerHTML = `
  <tr>

  <td><input type="text" class="form-control" id="edit1"></td>
  <td><div class="container">
  <div class="row">
      <div class="col-8 col-md-6">     
        <select class="custom-select" id="edit2">
          <option value="VP Sales">VP Sales</option>
          <option value="VP Marketing">VP Marketing</option>
          <option value="Sales Manager (APAC)">Sales Manager (APAC)</option>
          <option value="Sale Manager (EMEA)">Sale Manager (EMEA)</option>
          <option value="Sales Manager (NA)">Sales Manager (NA)</option>
          <option value="Sales Rep">Sales Rep</option>
        </select>   
      </div>
  </div></td>  
</tr>
  `
  document.getElementById("edit1").value = edmail
  document.getElementById("edit2").value = edTitle
  

}

function editEmployeeApply() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let eedEmployee = edEmployee;
  let mail = document.getElementById("edit1").value
  let jobtitle = document.getElementById("edit2").value
  db.transaction(function (tx) {
    tx.executeSql('UPDATE employees SET email = ?, jobTitle = ? WHERE employeeNumber = ?',
      [mail, jobtitle, eedEmployee]);
  });
}




function customerQuery() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNumber;
  let cName;
  let contactFName;
  let contactLName;
  let cPhone;
  let saleRep;
  let creditLimit;
  let memberPoint = 0;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM customers', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        cNumber = results.rows.item(i).customerNumber
        cName = results.rows.item(i).customerName
        contactLName = results.rows.item(i).contactLastName
        contactFName = results.rows.item(i).contactFirstName
        cPhone = results.rows.item(i).phone
        saleRep = results.rows.item(i).salesRepEmployeeNumber
        creditLimit = results.rows.item(i).creditLimit
        memberPoint = results.rows.item(i).mPoint
        let node = `
        <tr align="center">
        <td>`+ cNumber + `</td>
        <td>`+ cName + `</td>
        <td>`+ contactLName + `</td>
        <td>`+ contactFName + `</td>
        <td>`+ cPhone + `</td>
        <td>`+ saleRep + `</td>
        <td>`+ creditLimit + `</td>
        <td>`+ memberPoint + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddressesModal" onclick=viewCustomerAddr(this.parentNode.parentNode.firstChild.nextSibling)>
            View Addresses</button>
        </td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#HistoryModal" onclick=viewOrderedHistory(this.parentNode.parentNode.firstChild.nextSibling)>
            View History</button>
        </td>
      </tr>
      `;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function viewCustomerAddr(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNumber;
  let addrline1;
  let addrline2;
  let city;
  let state;
  let postalCode;
  let country;
  const cNum = location.textContent;
  const viewAddr = document.querySelector('#viewAddresses');
  viewAddr.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM customersAddresses WHERE customerNumber = ? AND DELETE_FLAG = "No"', [cNum], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        cNumber = results.rows.item(i).customerNumber
        addrline1 = results.rows.item(i).addressLine1
        addrline2 = results.rows.item(i).addressLine2
        city = results.rows.item(i).city
        state = results.rows.item(i).state
        postalCode = results.rows.item(i).postalCode
        country = results.rows.item(i).country
        let node = `
        <tr align="center">
        <td>`+ cNumber + `</td>
        <td>`+ addrline1 + `</td>
        <td>`+ addrline2 + `</td>
        <td>`+ city + `</td>
        <td>`+ state + `</td>
        <td>`+ postalCode + `</td>
        <td>`+ country + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditModal" onclick="editCustomerAddr(this)">
        Edit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteCustomerAddr(this)">
        Delete</button></td>
        </tr>
      `;
        viewAddr.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });

  // console.log(cNumber)
}

var editCusNum;
var initAddrLine1;

function editCustomerAddr(location) {
  const editBody = document.querySelector('#editAddress')
  editCusNum = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  initAddrLine1 = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  editBody.innerHTML = `
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

function editAddressApply() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let initAddrLine11 = initAddrLine1;
  let cNumber = editCusNum;
  let addrline1 = document.getElementById("edit1").value
  let addrline2 = document.getElementById("edit2").value
  let city = document.getElementById("edit3").value
  let state = document.getElementById("edit4").value
  let postalCode = document.getElementById("edit5").value
  let country = document.getElementById("edit6").value
  db.transaction(function (tx) {
    tx.executeSql('UPDATE customersAddresses SET addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ? WHERE customerNumber = ? AND addressLine1 = ?',
      [addrline1, addrline2, city, state, postalCode, country, cNumber, initAddrLine11]);
  });
}

function deleteCustomerAddr(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  const table = document.querySelector('#viewAddresses');
  const delRow = location.parentNode.parentNode.rowIndex - 1;
  editCusNum = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  initAddrLine1 = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  if (table.rows.length != 1) {
    table.deleteRow(delRow)
    db.transaction(function (tx) {
      tx.executeSql('UPDATE customersAddresses SET DELETE_FLAG = "Yes" WHERE customerNumber = ? AND addressLine1 = ?', [editCusNum, initAddrLine1]);
    });
  }


}

function viewOrderedHistory(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let orderNumber;
  let orderDate;
  let requiredDate;
  let shippedDate;
  let status;
  let customerNumber;
  let memberPoint;
  const cNum = location.textContent;
  const viewHistory = document.querySelector('#viewHistory');
  viewHistory.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orders WHERE customerNumber = ?', [cNum], function (tx, results) {
      let len = results.rows.length, i;
      if (len > 0) {
        for (i = 0; i < len; i++) {
          orderNumber = results.rows.item(i).orderNumber
          orderDate = results.rows.item(i).orderDate
          requiredDate = results.rows.item(i).requiredDate
          shippedDate = results.rows.item(i).shippedDate
          status = results.rows.item(i).status
          customerNumber = results.rows.item(i).customerNumber
          memberPoint = results.rows.item(i).mPointGet
          let node = `
          <tr align="center">
          <td>`+ customerNumber + `</td>
          <td>`+ orderNumber + `</td>
          <td>`+ orderDate + `</td>
          <td>`+ requiredDate + `</td>
          <td>`+ shippedDate + `</td>
          <td>`+ status + `</td>
          <td>`+ memberPoint + `</td>
          <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentModal" onclick="viewComment(this.parentNode.parentNode.firstChild.nextSibling)">
        View comments</button></td>
        </tr>
        `;
          viewHistory.insertAdjacentHTML('beforeend', node)
        }
      } else {
        viewHistory.innerHTML += `<h1 align="center">No Data</h1>`
      }
    }, null);
  });
}

function viewComment(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let comments;
  const cNum = location.textContent;
  const orderNum = location.nextSibling.nextSibling.textContent;
  const viewComment = document.querySelector('#viewComment');
  db.transaction(function (tx) {
    tx.executeSql('SELECT comments FROM orders WHERE customerNumber = ? AND orderNumber = ?', [cNum, orderNum], function (tx, results) {
      comments = results.rows.item(0).comments
      viewComment.innerHTML = `
          <p>
          `+ comments + `
          </p>
        `;

    }, null);
  });
}

function addCustomer() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNumber = document.getElementById("cNum").value;
  let cName = document.getElementById("cName").value;
  let contactFName = document.getElementById("cFName").value;
  let contactLName = document.getElementById("cLName").value;
  let cPhone = document.getElementById("cPhone").value;
  let addrNumber = document.getElementById("cAddrNum1").value;
  let addrline1 = document.getElementById("cAddr1").value;
  let addrline2 = document.getElementById("cAddr2").value;
  let city = document.getElementById("cCity").value;
  let state = document.getElementById("cState").value;
  let postalCode = document.getElementById("cPostal").value;
  let country = document.getElementById("cCountry").value;
  let saleRep = document.getElementById("cRep").value;
  let creditLimit = document.getElementById("cCredit").value;
  let memberPoint = 0;
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [cNumber, cName, contactLName, contactFName, cPhone, saleRep, creditLimit, memberPoint]);
    tx.executeSql('INSERT INTO customersAddresses VALUES (?, ?, ?, ?, ?, ?, ?, ?, "No")', [cNumber, addrline1, addrline2, city, state, postalCode, country, addrNumber]);
  });
}

function addCustomerAddress() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNumber = document.getElementById("cNum2").value;
  let addrline1 = document.getElementById("cAddr1-2").value;
  let addrline2 = document.getElementById("cAddr2-2").value;
  let city = document.getElementById("cCity2").value;
  let state = document.getElementById("cState2").value;
  let postalCode = document.getElementById("cPostal2").value;
  let country = document.getElementById("cCountry2").value;
  var addrNum = document.getElementById("cAddrNum").value;
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO customersAddresses VALUES (?, ?, ?, ?, ?, ?, ?, ?,"No")', [cNumber, addrline1, addrline2, city, state, postalCode, country, addrNum]);
  });

}

function clearAddAddrForm() {
  document.getElementById("cNum2").value = "";
  document.getElementById("cAddrNum").value = "";
  document.getElementById("cAddr1-2").value = "";
  document.getElementById("cAddr2-2").value = "";
  document.getElementById("cCity2").value = "";
  document.getElementById("cState2").value = "";
  document.getElementById("cPostal2").value = "";
  document.getElementById("cCountry2").value = "";
}

function clearAddMemberForm() {
  document.getElementById("cNum").value = "";
  document.getElementById("cName").value = "";
  document.getElementById("cFName").value = "";
  document.getElementById("cLName").value = "";
  document.getElementById("cPhone").value = "";
  document.getElementById("cAddrNum1").value = "";
  document.getElementById("cAddr1").value = "";
  document.getElementById("cAddr2").value = "";
  document.getElementById("cCity").value = "";
  document.getElementById("cState").value = "";
  document.getElementById("cPostal").value = "";
  document.getElementById("cCountry").value = "";
  document.getElementById("cRep").value = "";
  document.getElementById("cCredit").value = "";
}

function orderQuery() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let orderNumber;
  let orderDate;
  let requiredDate;
  let shippedDate;
  let status;
  let comments;
  let customerNumber;
  let memberPoint;
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orders', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        orderNumber = results.rows.item(i).orderNumber
        orderDate = results.rows.item(i).orderDate
        requiredDate = results.rows.item(i).requiredDate
        shippedDate = results.rows.item(i).shippedDate
        status = results.rows.item(i).status
        comments = results.rows.item(i).comments
        customerNumber = results.rows.item(i).customerNumber
        memberPoint = results.rows.item(i).mPointGet
        let node = `
        <tr align="center">
        <td>`+ customerNumber + `</td>
        <td>`+ orderNumber + `</td>
        <td>`+ orderDate + `</td>
        <td>`+ requiredDate + `</td>
        <td>`+ shippedDate + `</td>
        <td>`+ status + `</td>
        <td>`+ memberPoint + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentModal" onclick="viewComment(this.parentNode.parentNode.firstChild.nextSibling)">
        View</button></td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#DetailModal" onclick="viewOrderDetail(this.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling)">
        View</button></td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditModal" onclick="editOrder(this.parentNode.parentNode.firstChild.nextSibling)">
        Edit</button></td>
      </tr>`;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function viewOrderDetail(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let orderNumber
  let productCode
  let quantityOrdered
  let priceEach
  let orderLineNumber
  const orderNum = location.textContent;
  const viewOrderDetail = document.querySelector('#viewOrderDetail');
  viewOrderDetail.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orderdetails WHERE orderNumber = ?', [orderNum], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        orderNumber = results.rows.item(i).orderNumber
        productCode = results.rows.item(i).productCode
        quantityOrdered = results.rows.item(i).quantityOrdered
        priceEach = results.rows.item(i).priceEach
        orderLineNumber = results.rows.item(i).orderLineNumber
        let node = `
          <tr align="center">
          <td>`+ orderNumber + `</td>
          <td>`+ productCode + `</td>
          <td>`+ quantityOrdered + `</td>
          <td>`+ priceEach + `</td>
          <td>`+ orderLineNumber + `</td>
        </tr>
        `;
        viewOrderDetail.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function editOrder(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  const cNum = location.textContent;
  const orderNum = location.nextSibling.nextSibling.textContent;
  const tableBody = document.querySelector('#editOrder')
  tableBody.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM orders WHERE customerNumber = ? AND orderNumber = ?', [cNum, orderNum], function (tx, results) {
      shippedDate = results.rows.item(0).shippedDate
      status = results.rows.item(0).status
      comments = results.rows.item(0).comments
      let node = `
        <tr align="center">
        <td>`+ cNum + `</td>
        <td>`+ orderNum + `</td>
        <td><input type="text" class="form-control" id="editShippedDate" value=`+ shippedDate + `></td>
        <td id="editStatus">`+ status + `</td>
        <td><input type="text" class="form-control" id="editComments" value=`+ comments + `></td>
        </tr>`
      tableBody.insertAdjacentHTML('beforeend', node)
    }, null);
  });
}

function editStatus(location) {

  const status = document.querySelector("#editStatus")
  status.textContent = location.textContent
}

function editOrderApply() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNum = document.getElementById("editShippedDate").parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent
  let orderNum = document.getElementById("editShippedDate").parentNode.previousSibling.previousSibling.textContent
  let shippedDate = document.getElementById("editShippedDate").value
  let comments = document.getElementById("editComments").value
  let status = document.getElementById("editStatus").textContent
  db.transaction(function (tx) {
    tx.executeSql('UPDATE orders SET shippedDate = ?, status = ?, comments = ? WHERE customerNumber = ? AND orderNumber = ?',
      [shippedDate, status, comments, cNum, orderNum]);
  });
}

function paymentApply() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let cNum = document.getElementById("paymentCNum").value
  let pCheck = document.getElementById("paymentCheck").value
  let pDate = document.getElementById("paymentDate").value
  let pAmount = document.getElementById("paymentAmount").value
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO payments VALUES (?,?,?,?)',
      [cNum, pCheck, pDate, pAmount]);
  });
}

function paymentsQuery() {
  let db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let customerNumber
  let checkNumber
  let paymentDate
  let amount
  const tableBody = document.querySelector('#viewPayments')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM payments', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        customerNumber = results.rows.item(i).customerNumber
        checkNumber = results.rows.item(i).checkNumber
        paymentDate = results.rows.item(i).paymentDate
        amount = results.rows.item(i).amount
        let node = `
        <tr align="center">
        <td>`+ customerNumber + `</td>
        <td>`+ checkNumber + `</td>
        <td>`+ paymentDate + `</td>
        <td>`+ amount + `</td>
      </tr>`;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function productQuery() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let productCode
  let productName
  let productScale
  let productVendor
  let ProductDescription
  let quantityInStock
  let buyPrice
  let MSRP
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        productCode = results.rows.item(i).productCode
        productName = results.rows.item(i).productName
        productScale = results.rows.item(i).productScale
        productVendor = results.rows.item(i).productVendor
        ProductDescription = results.rows.item(i).productDescription
        quantityInStock = results.rows.item(i).quantityInStock
        buyPrice = results.rows.item(i).buyPrice
        MSRP = results.rows.item(i).MSRP
        let node = `
        <tr align="center">
        <td>`+ productCode + `</td>
        <td>`+ productName + `</td>
        <td>`+ productScale + `</td>
        <td>`+ productVendor + `</td>
        <td>`+ quantityInStock + `</td>
        <td>`+ buyPrice + `</td>
        <td>`+ MSRP + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ProductDesModal" onclick="ProductDescription(this)">
        Product Description</button></td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productEditModal" onclick="editProduct(this)">
        Edit</button></td>
      </tr>`;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function ProductDescription(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let productCodeLocation = location.parentNode.parentNode.firstChild.nextSibling.textContent
  const tableBody = document.querySelector('#viewProDes')
  tableBody.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products WHERE productCode = ?', [productCodeLocation], function (tx, results) {
      let ProductDescription
      ProductDescription = results.rows.item(0).productDescription
      let node = `
        <div><a>`+ ProductDescription + `</a></div>
        `;
      tableBody.insertAdjacentHTML('beforeend', node)
    }, null);
  });
}

function ProductEdit(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let productCode
  let productName
  let productScale
  let productVendor
  let ProductDescription
  let quantityInStock
  let buyPrice
  let MSRP
  let productCodeLocation = location.parentNode.parentNode.firstChild.nextSibling.textContent
  const tableBody = document.querySelector('#editProduct')
  tableBody.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM products WHERE productCode = ?', [productCodeLocation], function (tx, results) {
      productCode = results.rows.item(0).productCode
      productName = results.rows.item(0).productName
      productScale = results.rows.item(0).productScale
      productVendor = results.rows.item(0).productVendor
      ProductDescription = results.rows.item(0).productDescription
      quantityInStock = results.rows.item(0).quantityInStock
      buyPrice = results.rows.item(0).buyPrice
      MSRP = results.rows.item(0).MSRP
      let node = `
        <tr align="center">
        <td>`+ productCode + `</td>
        <td>`+ productName + `</td>
        <td>`+ productScale + `</td>
        <td>`+ productVendor + `</td>
        <td>`+ quantityInStock + `</td>
        <td>`+ buyPrice + `</td>
        <td>`+ MSRP + `</td>
      </tr>`;
      tableBody.insertAdjacentHTML('beforeend', node)

    }, null);
  });
}

function addProduct() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let productCode = document.getElementById("productCode").value;
  let productName = document.getElementById("productName").value;
  let productLine = document.getElementById("productLine").value;
  let productScale = document.getElementById("productScale").value;
  let productVendor = document.getElementById("productVendor").value;
  let productDescription = document.getElementById("productDescription").value;
  let quantityInStock = document.getElementById("quantityInStock").value;
  let buyPrice = document.getElementById("buyPrice").value;
  let MSRP = document.getElementById("MSRP").value;
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP]);
  });
}

function editProduct(location) {
  const editBody = document.querySelector('#editProduct')
  eproductCode = location.parentNode.parentNode.firstChild.nextSibling.textContent;
  eproductName = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent;
  eproductScale = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  eproductVendor = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  ebuyPrice = location.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
  eMSRP = location.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
  equantityInStock = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
  editBody.innerHTML = `
  <tr>

  <td><input type="text" class="form-control" id="edit2"></td>
  <td><input type="text" class="form-control" id="edit3"></td>
  <td><input type="text" class="form-control" id="edit4"></td>
  <td><input type="text" class="form-control" id="edit5"></td>
  <td><input type="text" class="form-control" id="edit6"></td>
  <td><input type="text" class="form-control" id="edit7"></td>
</tr>
  `
  document.getElementById("edit2").value = eproductName
  document.getElementById("edit3").value = eproductScale
  document.getElementById("edit4").value = eproductVendor
  document.getElementById("edit5").value = equantityInStock
  document.getElementById("edit6").value = ebuyPrice
  document.getElementById("edit7").value = eMSRP
}

function editProductApply() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let eeproductCode = eproductCode;
  let eeproductName = document.getElementById("edit2").value
  let eeproductScale = document.getElementById("edit3").value
  let eeproductVendor = document.getElementById("edit4").value
  let eequantityInStock = document.getElementById("edit5").value
  let eebuyPrice = document.getElementById("edit6").value
  let eeMSRP = document.getElementById("edit7").value
  db.transaction(function (tx) {
    tx.executeSql('UPDATE products SET productName = ?, productScale = ?, productVendor = ?, quantityInStock = ?, buyPrice = ?, MSRP = ? WHERE productCode = ?',
      [eeproductName, eeproductScale, eeproductVendor, eequantityInStock, eebuyPrice, eeMSRP, eeproductCode]);
  });
}

function couponQuery() {
  let db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let discountCode
  let discountAmount
  let timeCanUse
  let expiryDate
  const tableBody = document.querySelector('#TableBody')
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM coupons', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        discountCode = results.rows.item(i).discountCode
        discountAmount = results.rows.item(i).discountAmount
        timeCanUse = results.rows.item(i).timeCanUse
        expiryDate = results.rows.item(i).expiryDate
        usedTime = results.rows.item(i).usedTime
        let node = `
        <tr align="center">
        <td>`+ (i + 1) + `</td>
        <td>`+ discountCode + `</td>
        <td>`+ "$" + discountAmount + `</td>
        <td>`+ timeCanUse + `</td>
        <td>`+ expiryDate + `</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteCoupon(this)">
        Delete</button></td>
      </tr>`;
        tableBody.insertAdjacentHTML('beforeend', node)
      }
    }, null);
  });
}

function addCoupon() {
  let discountCode = document.getElementById("disCode").value
  let discountAmount = document.getElementById("disAmount").value
  let timeCanUse = document.getElementById("disUse").value
  let expiryDate = document.getElementById("disExp").value
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO coupons VALUES (?, ?, ?, ?)', [discountCode, discountAmount, timeCanUse, expiryDate]);
  });
}

function deleteCoupon(location) {
  const code = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent
  const table = document.querySelector('#TableBody');
  const delRow = location.parentNode.parentNode.rowIndex - 1;
  table.deleteRow(delRow)
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM coupons WHERE discountCode = ?', [code]);
  });
}

function clearDetailRow() {
  let addStock = document.querySelector("#DetailRow")
  addStock.innerHTML = `                            
  <div class="form-group">
  <input type="text" class="form-control" style="margin-right: 40px;" id="stockNumD" placeholder="stockNumber">
  </div>
  <div class="form-group">
  <input type="text" class="form-control" style="margin-right: 40px;" id="productCodeD" placeholder="productCode">
  </div>
  <div class="form-group">
  <input type="text" class="form-control" style="margin-right:200px;" id="qtyD" placeholder="quantity">
  </div>
  <div>`
}

function addStock() {
  let stockNum = document.getElementById("stockNumD").value
  let productCode = document.getElementById("productCodeD").value
  let qty = document.getElementById("qtyD").value
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO stockDetails VALUES (?, ?, ?)', [stockNum, productCode, qty]);
  });
}

function clearStockRow() {
  document.getElementById("updateStock").value = ""
  document.getElementById("stockInDate").value = ""

}

function updateStock() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let stockNum = document.getElementById("updateStock").value
  let date = document.getElementById("stockInDate").value
  let productCode
  let qty
  db.transaction(function (tx) {
    tx.executeSql('SELECT sum(quantity) as qty FROM stockDetails WHERE stockNumber = ?', [stockNum], function (tx, results) {
      let totalQty = results.rows.item(0).qty
      tx.executeSql('INSERT INTO stock VALUES (?, ?, ?)', [stockNum, date, totalQty]);
    }, null);
    tx.executeSql('SELECT * FROM stockDetails WHERE stockNumber = ?', [stockNum], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        productCode = results.rows.item(i).productCode
        qty = results.rows.item(i).quantity
        tx.executeSql('UPDATE products SET quantityInStock = quantityInStock + ? WHERE productCode = ?', [qty, productCode]);
      }
    }, null);

  });
}

function stockQuery() {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let stockNum = ""
  let date = ""
  let amount = ""
  const TableBody = document.querySelector('#TableBody');
  TableBody.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM stock ', [], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        stockNum = results.rows.item(i).stockNumber
        date = results.rows.item(i).date
        amount = results.rows.item(i).amount
        let node = `
        <tr align="center">
        <td>`+ stockNum + `</td>
        <td>`+ date + `</td>
        <td>`+ amount + `</td>
        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#DetailModal" onclick="viewStockDetail(this)">
      View stockDetail</button></td>
      </tr>
        `
        TableBody.insertAdjacentHTML('beforeend', node)
      }

    }, null);
  });
}

function viewStockDetail(location) {
  var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
  let stockNum = location.parentNode.parentNode.firstChild.nextSibling.textContent
  let productCode
  let quantity
  const viewStockDetail = document.querySelector('#viewStockDetail');
  viewStockDetail.innerHTML = ""
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM stockDetails WHERE stockNumber = ? ', [stockNum], function (tx, results) {
      let len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        stockNum = results.rows.item(i).stockNumber
        productCode = results.rows.item(i).productCode
        quantity = results.rows.item(i).quantity
        let node = `
        <tr align="center">
        <td>`+ stockNum + `</td>
        <td>`+ productCode + `</td>
        <td>`+ quantity + `</td>
        `
        viewStockDetail.insertAdjacentHTML('beforeend', node)
      }

    }, null);
  });
}

function tableSearch() {
  // Declare variables
  var $rows = $('#TableBody tr');
  $('#quicksearch').keyup(debounce(function () {

    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

    $rows.show().filter(function () {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
    }).hide();
  }, 300));

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
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
// getCookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
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