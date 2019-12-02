function AddtoCart(location){
    let pCode = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
    let pName = location.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.firstChild.textContent
    let pVendor = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
    let pScale = location.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.textContent
    let pPrice = location.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.textContent.replace('$','')
    let pQty = 1
    var db = openDatabase('ClassicModelShop', '1.0', 'Classic model shop v.1', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO carts VALUES (?, ?, ?, ? ,? ,?)', [pCode,pName,pVendor,pScale,pPrice,pQty]);
  });
  }