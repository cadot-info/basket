var ButtonAddClass,ButtonRemClass,IdnbrProducts,ClassList,IdtotalProducts;

const basket = {
  //loop for take action on element with class ButtonClass and add like or not like on element
  init(
    init_buttonAddClass = 'addBasket',
    init_buttonRemClass = 'remBasket',
    init_IdnbrProducts = 'nbrProducts',
    init_ClassList = 'listProducts',
    init_IdtotalProducts = 'totalProducts'
  ) {
    ButtonAddClass = init_buttonAddClass;
    ButtonRemClass = init_buttonRemClass;
    IdnbrProducts=init_IdnbrProducts;
    ClassList=init_ClassList;
    IdtotalProducts=init_IdtotalProducts;

    let cookie = checkACookieExists('basket');
    if (cookie == false) cookie = [];
    // take action add for class elements
    var elements = document.getElementsByClassName(ButtonAddClass);
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(
        'click',
        function () {
          basket.add(this); //add action for change cookie
        },
        false
      );
    }
     // take action rem for class elements
     var elements = document.getElementsByClassName(ButtonRemClass);
     for (var i = 0; i < elements.length; i++) {
       elements[i].addEventListener(
         'click',
         function () {
           basket.rem(this); //add action for change cookie
         },
         false
       );
     }
    basket.update();
  },
  //clear cookie basket
  clear() {
    document.cookie = 'basket=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },
  //get array of cookie basket or false
  get() {
    return checkACookieExists();
  },
  //return parameters, for tests
  getParameters() {
    return ButtonAddClass+ButtonRemClass+IdnbrProducts+ClassList+IdtotalProducts;
  },
  //add in cookie basket
  add(objet) {
    //create objet default
    let obj={
      "id":objet.dataset.id,
      "name":objet.dataset.name,
      "price":objet.dataset.price,
      "opts":objet.dataset.opts,
      "quantity":1
    };
    //verification cookie exist
    let cookie = checkACookieExists('basket');
    if (cookie != false) {// si basket cookie exist
      //loo on objet for seek id
      let index=-1;
      let num=0;
      cookie.forEach(element => {
        num+=0;
        if(element.id==objet.dataset.id)index=num;
      });
      if (index !== -1) //if it is already in the list
        cookie[index].quantity+=1;
      else cookie.push(obj); //If we cookie but not we are added
    } else {//if cookie don't exist
      cookie = [obj];
    }
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 360);
    document.cookie = 'basket=' + JSON.stringify(cookie) + ';path=/;expires=' + d.toGMTString();
    basket.update();
    return cookie;
  },
  //remove in cookie basket
  rem(objet) {
    //verification cookie exist
    let cookie = checkACookieExists('basket');
    if (cookie != false) {// si basket cookie exist
      //loo on objet for seek id
      let index=-1;
      let num=0;
      cookie.forEach(element => {
        num+=0;
        if(element.id==objet.dataset.id)index=num;
      });
      if (index !== -1){ //if it is already in the list
        if(cookie[index].quantity-1==0)
        cookie.splice(index, 1);
        else
        cookie[index].quantity-=1;
        //add in cookie
        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 360);
        document.cookie = 'basket=' + JSON.stringify(cookie) + ';path=/;expires=' + d.toGMTString();
        basket.update();
      }
    } 
   
    return cookie;
  },
  //update in document the counter
  update() {
    let cookie = checkACookieExists('basket');
    if (cookie!=false && typeof document.getElementById(IdnbrProducts) != 'undefined' && document.getElementById(IdnbrProducts) != null)
    {
      let total=0;
      cookie.forEach(element=>{
      total+=element.quantity;
      })
      
      return (document.getElementById(IdnbrProducts).textContent = total);
    }
  },
};

//function for get false or array of cookie basket
function checkACookieExists() {
  if (document.cookie == undefined) return false;
  let field = document.cookie.split('; ').find((row) => row.startsWith('basket='));
  if (field == undefined) return false;
  return JSON.parse(field.split('=')[1]);
}

module.exports = basket;
