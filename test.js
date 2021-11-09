/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, 'example.html'), 'utf8');

const basket = require('./index.js');

beforeAll(() => {
  document.body.innerHTML = html;
});

test('var by default', () => {
  //init for tests
  basket.clear();
  //test parameters not possible because lineobjet is modified
  //basket.init('aaa','zzz', 'yes', 'no', 'bbb','cccc');
  //expect(basket.getParameters()).toBe('aaazzzyesnobbbcccc');
  basket.init();
    expect(basket.getParameters()).toBe("addBasketremBasketnbrProductslistProductstotalPriceProductsnbrTotalProducts");

  expect(document.getElementById('nbrProducts').textContent).toBe("");
  //add object
  document.querySelectorAll(".addBasket")[0].click();
  expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":\"green\"}", "price": "12.12", "quantity": 1}]);
  expect(document.getElementById('nbrProducts').textContent).toBe("1");
  expect(document.getElementById('nbrTotalProducts').textContent).toBe("1");
  expect(document.getElementById('totalPriceProducts').textContent).toBe("12.12");
    expect(document.getElementById('listProducts').innerHTML).toBe("<li><span class=\"productName\">Flour of corn</span><span class=\"productQuantity\">1</span><span class=\"productOpts\">¤delivered,</span><span class=\"productPrice\">12.12</span></li>");

  //add same object
  document.querySelectorAll(".addBasket")[0].click();
  expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":\"green\"}", "price": "12.12", "quantity": 2}]);
  expect(document.getElementById('nbrProducts').textContent).toBe("2");
  expect(document.getElementById('nbrTotalProducts').textContent).toBe("1");
  expect(document.getElementById('listProducts').innerHTML).toBe("<li><span class=\"productName\">Flour of corn</span><span class=\"productQuantity\">2</span><span class=\"productOpts\">¤delivered,</span><span class=\"productPrice\">24.24</span></li>");
  expect(document.getElementById('totalPriceProducts').textContent).toBe("24.24");

 //add other object
 document.querySelectorAll(".addBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":\"green\"}", "price": "12.12", "quantity": 2},{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\",\"¤color\":\"purple\"}", "price": "1.11", "quantity": 1}]);
 expect(document.getElementById('nbrProducts').textContent).toBe("3");
 expect(document.getElementById('nbrTotalProducts').textContent).toBe("2");
 expect(document.getElementById('listProducts').innerHTML).toBe("<li><span class=\"productName\">Flour of corn</span><span class=\"productQuantity\">2</span><span class=\"productOpts\">¤delivered,</span><span class=\"productPrice\">24.24</span></li><li><span class=\"productName\">wine bordeaux 2016</span><span class=\"productQuantity\">1</span><span class=\"productOpts\">¤warning,¤color,</span><span class=\"productPrice\">1.11</span></li>");
 expect(document.getElementById('totalPriceProducts').textContent).toBe("25.35");

 //del first object
 document.querySelectorAll(".remBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":\"green\"}", "price": "12.12", "quantity": 1},{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\",\"¤color\":\"purple\"}", "price": "1.11", "quantity": 1}]);
 expect(document.getElementById('nbrProducts').textContent).toBe("2");
 expect(document.getElementById('nbrTotalProducts').textContent).toBe("2");
 expect(document.getElementById('listProducts').innerHTML).toBe("<li><span class=\"productName\">Flour of corn</span><span class=\"productQuantity\">1</span><span class=\"productOpts\">¤delivered,</span><span class=\"productPrice\">12.12</span></li><li><span class=\"productName\">wine bordeaux 2016</span><span class=\"productQuantity\">1</span><span class=\"productOpts\">¤warning,¤color,</span><span class=\"productPrice\">1.11</span></li>");
 expect(document.getElementById('totalPriceProducts').textContent).toBe("13.23");

 //del first object
 document.querySelectorAll(".remBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\",\"¤color\":\"purple\"}", "price": "1.11", "quantity": 1}]);
 expect(document.getElementById('listProducts').innerHTML).toBe("<li><span class=\"productName\">wine bordeaux 2016</span><span class=\"productQuantity\">1</span><span class=\"productOpts\">¤warning,¤color,</span><span class=\"productPrice\">1.11</span></li>");
 expect(document.getElementById('totalPriceProducts').textContent).toBe("1.11");

//verify count on document
 expect(document.getElementById('nbrProducts').textContent).toBe("1");
 expect(document.getElementById('nbrTotalProducts').textContent).toBe("1");

});
