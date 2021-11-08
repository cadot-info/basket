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
  //test parameters
  basket.init('aaa','zzz', 'yes', 'no', 'bbb');
  expect(basket.getParameters()).toBe('aaazzzyesnobbb');
  basket.init();
    expect(basket.getParameters()).toBe("addBasketremBasketnbrProductslistProductstotalProducts");

  //test fucntion get if cookies not exist
  expect(basket.get()).toBe(false);
  expect(document.getElementById('nbrProducts').textContent).toBe("");
  //add object
  document.querySelectorAll(".addBasket")[0].click();
  expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":[\"green\",\"red\"]}", "price": "12.12", "quantity": 1}]);
  expect(document.getElementById('nbrProducts').textContent).toBe("1");
  //add same object
  document.querySelectorAll(".addBasket")[0].click();
  expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":[\"green\",\"red\"]}", "price": "12.12", "quantity": 2}]);
  expect(document.getElementById('nbrProducts').textContent).toBe("2");
 //add other object
 document.querySelectorAll(".addBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":[\"green\",\"red\"]}", "price": "12.12", "quantity": 2},{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\"}", "price": "1.11", "quantity": 1}]);
 expect(document.getElementById('nbrProducts').textContent).toBe("3");
 //del first object
 document.querySelectorAll(".remBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-1", "name": "Flour of corn", "opts": "{\"¤delivered\":\"4 days\",\"color\":[\"green\",\"red\"]}", "price": "12.12", "quantity": 1},{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\"}", "price": "1.11", "quantity": 1}]);
 expect(document.getElementById('nbrProducts').textContent).toBe("2");
 //del first object
 document.querySelectorAll(".remBasket")[2].click();
 expect(basket.get()).toStrictEqual([{"id": "prod-3", "name": "wine bordeaux 2016", "opts": "{\"¤warning\":\"allergen sulfite\"}", "price": "1.11", "quantity": 1}]);
//verify count on document
 expect(document.getElementById('nbrProducts').textContent).toBe("1");
  //  //test remove basketorite
  //  expect(basket.change(1)).toStrictEqual([4, 3]);
  //  expect(basket.update()).toBe(2);
  //     //test on document
  //  expect(document.getElementById('counter').textContent).toBe("2")
});
