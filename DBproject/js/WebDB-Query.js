
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

// function AddtoCart(){

//   }

function empQuery(){
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
        <tr>
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