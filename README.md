<!-- TITLE/ -->

<h1>A javascript basket with cookies and create html, install and use in 5 minutes!</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/cadot-info-basket" title="View this project on NPM"><img src="https://img.shields.io/npm/v/cadot-info-basket.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/cadot-info-basket" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/cadot-info-basket.svg" alt="NPM downloads" /></a></span>
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/Naereen/badges)
<br class="badge-separator" />
<span class="badge-paypal"><a href="https://www.paypal.com/donate?hosted_button_id=E9S29AEA3HGXQ" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

A javascript basket with cookies and create html, install and use in 5 minutes!

<!-- /DESCRIPTION -->

# Install

`npm install --save cadot-info-basket`
or
`yarn add cadot-info-basket`

## Usage

- `const basket = require("cadot-info-basket");`
- `basket.init();` for default config (described after)

### Initialisation

you can define parameter in init:
-ButtonAddClass = class for add in basket
-ButtonRemClass = class for remove in basket
-IdnbrProducts = id for get number of products
-ClassList = class of lists element, the first element is the base for create the others
-IdtotalProducts = id for get price of tottal products
-IdnbrTotalProducts = id for get total de category of product

example:
`basket.init('classButton'...)`

### Integration
You are two parts
### basket viewer
```html
<div id="basket">
    <h1>Basket</h1>
    <p>Number of products in the basket <span id="nbrProducts"></span></p>
    <p>Number of product type in the basket:<span id="nbrTotalProducts"></span></p>
    <ul id="listProducts">
        <li><span class="productName"></span><span class="productQuantity"></span><span class="productOpts"></span><span class="productPrice"></span></li>
    </ul>
    <p id="totalPriceProducts"></p>
</div>
```
notes:
  -you can move the elements add text, icons...

### products

#### a button for add a product
`<button class="addBasket" data-id="prod-1" data-name="Flour of corn" data-price="12.12" data-opts='{"¤delivered":"4 days","color":"green"}'>Flour</button>`
note:
-data-id, data-name and data-price  is necessary
-data-opts can set in basket a visible option (by the ¤ in first) and hidden option by other

#### a button for remove
`<button data-id="prod-1" class="remBasket">remove</button>`
note:data-id is necessary

### additions
you can make a clear basket
`<button id="clearbasket">clear basket</button>`

### tips
if you want button without basket in a page, you can add div with `<div id="basket"></div>` in the page buttons.

### Complete example

```html
<!-- ------------------------------- basket -------------------------------- -->
<div id="basket">
    <h1>Basket</h1>
    <p>Number of products in the basket <span id="nbrProducts"></span></p>
    <p>Number of product type in the basket:<span id="nbrTotalProducts"></span></p>
    <ul id="listProducts">
      <!-----template line for product -------->
        <li><span class="productName"></span><span class="productQuantity"></span><span class="productOpts"></span><span class="productPrice"></span></li>
    </ul>
    <p id="totalPriceProducts"></p>
</div>
<!-- ------------------------------ products ------------------------------- -->
<h2>Products</h2>

<button id="clearbasket">clear basket</button>

<button class="addBasket" data-id="prod-1" data-name="Flour of corn" data-price="12.12" data-opts='{"¤delivered":"4 days","color":"green"}'>Flour</button>

<button data-id="prod-1" class="remBasket">remove</button>

<button class="addBasket" data-id="prod-2" data-name="honey best quality" data-price="3.33" data-opts='{"¤delivered":"Immediatly","color":"red"}'>honey</button>
<button data-id="prod-2" class="remBasket">remove</button>

<button data-id="prod-3" class="remBasket">remove</button>
</div>
```


please give issues or Pull Request in github ;-)

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2021+ <a href="https://cadot.info">Cadot.info ltd</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->


# basket
