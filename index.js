var ButtonAddClass, ButtonRemClass, IdnbrProducts, ClassList, IdtotalProducts, IdnbrTotalProducts, lineobjet;

const basket = {
  /* -------------------------------------------------------------------------- */
  /*                       loop for take action and inits                       */
  /* -------------------------------------------------------------------------- */
  init(
    init_buttonAddClass = 'addBasket',
    init_buttonRemClass = 'remBasket',
    init_IdnbrProducts = 'nbrProducts',
    init_ClassList = 'listProducts',
    init_IdtotalProducts = 'totalPriceProducts',
    init_IdnbrTotalProducts = 'nbrTotalProducts'
  ) {
    ButtonAddClass = init_buttonAddClass;
    ButtonRemClass = init_buttonRemClass;
    IdnbrProducts = init_IdnbrProducts;
    ClassList = init_ClassList;
    IdtotalProducts = init_IdtotalProducts;
    IdnbrTotalProducts = init_IdnbrTotalProducts;

    /* ----------------------------- init the cookie ---------------------------- */
    let cookie = checkACookieExists('basket');
    if (cookie == false) cookie = [];
    /* ------------------- take action add for class elements ------------------- */
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
    /* ------------------- take action rem for class elements ------------------- */
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
    /* ----------------------- init presenttaion of line ----------------------- */
    lineobjet = document.getElementById('listProducts').firstElementChild.cloneNode(true); //contain the presentation of objet

    /* ------------------------------ clear button ------------------------------ */
    document.getElementById('clearbasket').addEventListener(
      'click',
      function () {
        basket.clear(this); //add action for change cookie
        basket.update();
      },
      false
    );

    /* ---------------------------- update the basket --------------------------- */
    basket.update();
  },

  /* -------------------------------------------------------------------------- */
  /*                             clear cookie basket                            */
  /* -------------------------------------------------------------------------- */
  clear() {
    document.cookie = 'basket=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  /* -------------------------------------------------------------------------- */
  /*                     get array of cookie basket or false                    */
  /* -------------------------------------------------------------------------- */
  get() {
    return checkACookieExists();
  },

  /* -------------------------------------------------------------------------- */
  /*                        return parameters, for tests                        */
  /* -------------------------------------------------------------------------- */
  getParameters() {
    return ButtonAddClass + ButtonRemClass + IdnbrProducts + ClassList + IdtotalProducts + IdnbrTotalProducts;
  },

  /* -------------------------------------------------------------------------- */
  /*                            add in cookie basket                            */
  /* -------------------------------------------------------------------------- */
  add(objet) {
    /* -------------------------- create objet default -------------------------- */
    let obj = {
      id: objet.dataset.id,
      name: objet.dataset.name,
      price: objet.dataset.price,
      opts: objet.dataset.opts,
      quantity: 1,
    };
    /* ------------------------ verification cookie exist ----------------------- */
    let cookie = checkACookieExists('basket');
    if (cookie != false) {
      // si basket cookie exist
      /* ------------------------ loo on objet for seek id ------------------------ */
      let index = -1;
      let num = 0;
      cookie.forEach((element) => {
        num += 0;
        if (element.id == objet.dataset.id) index = num;
      });
      if (index !== -1)
        //if it is already in the list
        cookie[index].quantity += 1;
      else cookie.push(obj); //If we cookie but not we are added
    } else {
      //if cookie don't exist
      cookie = [obj];
    }
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 360);
    document.cookie = 'basket=' + JSON.stringify(cookie) + ';path=/;expires=' + d.toGMTString();
    basket.update();
    return cookie;
  },

  /* -------------------------------------------------------------------------- */
  /*                           remove in cookie basket                          */
  /* -------------------------------------------------------------------------- */
  rem(objet) {
    /* ------------------------ verification cookie exist ----------------------- */
    let cookie = checkACookieExists('basket');
    if (cookie != false) {
      // si basket cookie exist
      //loo on objet for seek id
      let index = -1;
      let num = 0;
      cookie.forEach((element) => {
        num += 0;
        if (element.id == objet.dataset.id) index = num;
      });
      if (index !== -1) {
        //if it is already in the list
        if (cookie[index].quantity - 1 == 0) cookie.splice(index, 1);
        //remove object
        else cookie[index].quantity -= 1; //lower quantity
        /* ------------------------------ rem in cookie ----------------------------- */
        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 360);
        document.cookie = 'basket=' + JSON.stringify(cookie) + ';path=/;expires=' + d.toGMTString();
        basket.update();
      }
    }

    return cookie;
  },

  /* -------------------------------------------------------------------------- */
  /*                       update in document the counters                      */
  /* -------------------------------------------------------------------------- */
  update() {
    
    let total = 0;
    let totaltype = 0;
    let totalprice = 0;
/* --------------------------------- calcul --------------------------------- */
    document.getElementById('listProducts').innerHTML = '';
    let cookie = checkACookieExists('basket');
    if (cookie != false) {
      
      /* ---------------------------------- loop ---------------------------------- */
      cookie.forEach((element) => {
        //nbr total of objects
        total += element.quantity;
        //nbr type objetcts
        totaltype += 1;
        /* ---------------------------- create line objet --------------------------- */
        let lineFull = lineobjet.cloneNode(true);
        lineFull.getElementsByClassName('productName')[0].innerHTML = element.name;
        lineFull.getElementsByClassName('productQuantity')[0].innerHTML = element.quantity;
        //catch option with ¤
        let res = ''; //stocke opt visible
        for (var e in JSON.parse(element.opts)) {
          if (e.charAt(0) == '¤') res += e.substring(1) + ',';
        }
        lineFull.getElementsByClassName('productOpts')[0].innerHTML = res.substring(0, res.length - 1);
        lineFull.getElementsByClassName('productPrice')[0].innerHTML = element.quantity * element.price;
        totalprice += element.quantity * element.price;

        document.getElementById('listProducts').appendChild(lineFull);
      });
    }
     /* ----------------------------- update document ---------------------------- */
     if (
      typeof document.getElementById(IdnbrTotalProducts) != 'undefined' &&
      document.getElementById(IdnbrTotalProducts) != null
    )
      document.getElementById(IdnbrTotalProducts).textContent = totaltype;
    if (
      typeof document.getElementById(IdnbrProducts) != 'undefined' &&
      document.getElementById(IdnbrProducts) != null
    )
      document.getElementById(IdnbrProducts).textContent = total;
    if (
      typeof document.getElementById(IdtotalProducts) != 'undefined' &&
      document.getElementById(IdtotalProducts) != null
    )
      document.getElementById(IdtotalProducts).textContent = totalprice.toFixed(2);
  },
};

/* -------------------------------------------------------------------------- */
/*              function for get false or array of cookie basket              */
/* -------------------------------------------------------------------------- */
function checkACookieExists() {
  if (document.cookie == undefined) return false;
  let field = document.cookie.split('; ').find((row) => row.startsWith('basket='));
  if (field == undefined) return false;
  return JSON.parse(field.split('=')[1]);
}

module.exports = basket;
