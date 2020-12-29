/**
  *****************************************************************************
  * @file    shoppingCart.js
  * @author  Sirine KRIAA
  * @version V01.00
  * @date    21/12/2020
  * @brief   DOM checkpoint: for more details look bellow
  *****************************************************************************
  * @Objective
  * For this checkpoint, you’ll have to recreate a shopping cart, in this 
  * scenario it’s a cart inwhich items have already been preselected and from 
  * this particular screen, the user is able to do the next instructions.
  * 
  * @Instructions
  * 1- Adjust the quantity of each item through a “+” and “-” buttons.
  * 2- Delete items from the cart.
  * 3- Like items through a clickable heart that will change color accordingly.
  * 4- See the total price adjusted according to quantity and deletions.
  *
  *****************************************************************************
  */
/*---------------------------------------------------------------------------*/
/* Functions ----------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
/** ***************************************************************************
  * @brief      Get price from string
  * @param      str: price string
  * @param      device: price devise to be removed
  * @return     the price extract from the entered price string:number
  ************************************************************************** */
function get_price_from_string(str, device)
{
  let str_price = "";

  /* Remove white space from string */
  str_price = ((str.split(" ")).join(""));
  /* Remove unused string to have string only with numbers */
  str_price = str_price.substr(0, str_price.length - device.length);

  /* Remove whitespaces and convert to number */
  return Number(parseFloat(str_price.replace(/ /g, "")).toFixed(3));
}

/** ***************************************************************************
  * @brief      Set price to string
  * @param      price: price number
  * @param      device: price devise to be added
  * @return     price string that joins price and device
  ************************************************************************** */
function set_price_to_string(price, device)
{
  let str_price = " " + device;
  let ctr = 0;

  /* Convert price to string */
  price = price.toFixed(3);
  /* Append price fraction part */
  str_price = price.substr(price.indexOf("."),
                           price.length - price.indexOf(".")) + str_price;
  /* Append price integer part: with whitespaces */
  for(let i=price.indexOf(".") - 1; i>=0; i--)
  {
      if(ctr == 3)
      {
          str_price = " " + str_price;
          ctr = 0;
      }
      str_price = price.charAt(i) + str_price;
      ctr++;
  }

  /* Return new price string */
  return str_price;
}

/** ***************************************************************************
  * @brief      Calculate total price to be payed
  * @param      arrPrice: array of selected products to buy
  * @return     String of the total amount to pay
  ************************************************************************** */
function calculate_total_price(device)
{
  let arrItemPrice = Array.from(document.getElementsByClassName("total_product_price"));
  let strTotalAmount = document.getElementById('amount_to_pay');
  let nbrSum = 0;

  /* Calculate the sum */
  for(let strItemPrice of arrItemPrice)
  {
    nbrSum += get_price_from_string(strItemPrice.innerHTML, device);
  }

  strTotalAmount.innerHTML = set_price_to_string(nbrSum, device);
}

/** ***************************************************************************
  * @brief      Mark item to liked item
  * @param      heartIcon: heart icon to color with red or black
  * @return     Nothing
  ************************************************************************** */
function mark_item_liked(heartIcon)
{
  heartIcon.style.color == "red"?heartIcon.style.color = "grey":
                                 heartIcon.style.color = "red";
}

/** ***************************************************************************
  * @brief      Remove item
  * @param      cartItem:
  * @return     Nothing
  ************************************************************************** */
function remove_item(cartItem)
{
  cartItem.remove();
  /* Get total amount to be payed */
  calculate_total_price(device);
}

/** ***************************************************************************
  * @brief      Increment item number
  * @param      ItemNbr:
  * @param      ItemPrice:
  * @param      ItemTotalPrice:
  * @return     Nothing
  ************************************************************************** */
function increment_cart_item_number(ItemNbr, ItemPrice, ItemTotalPrice)
{
  let value = 0;
  let price;

  value = Number(ItemNbr.getAttribute('value')) + 1;
  ItemNbr.setAttribute('value', value.toString());
  price = get_price_from_string(ItemPrice.innerHTML, device);
  ItemTotalPrice.innerHTML = set_price_to_string((price * value), device);
  /* Get total amount to be payed */
  calculate_total_price(device);
}

/** ***************************************************************************
  * @brief      Decrement item number
  * @param      ItemNbr:
  * @param      ItemPrice:
  * @param      ItemTotalPrice:
  * @param      cartItem:
  * @return     Nothing
  ************************************************************************** */
function decrement_cart_item_number(ItemNbr,
                                    ItemPrice,
                                    ItemTotalPrice,
                                    cartItem)
{
  let value = 0;

  value = Number(ItemNbr.getAttribute('value'));
  if(value > 0)
  {
    value--;
    ItemNbr.setAttribute('value', value.toString());
    price = get_price_from_string(ItemPrice.innerHTML, device);
    ItemTotalPrice.innerHTML = set_price_to_string((price * value), device);
    calculate_total_price(device);
  }
}

var strTotalAmount = "";
var device = "";
var arrPrice = [];
var arrCartItems = [];
var arrTrushBtns = [];
var arrLikeBtns= [];
var arrAddIcon = [];
var arrItemPrice = [];
var arrItemNbr = [];
var arrItemTotalPrice = [];

function init()
{
  arrItemPrice = Array.from(document.getElementsByClassName("unit_price"));
  device = 
     arrItemPrice[0].innerHTML.slice(
          arrItemPrice[0].innerHTML.lastIndexOf(" ") + 1,
          arrItemPrice[0].innerHTML.length - arrItemPrice[0].innerHTML.indexOf(""));
  arrItemNbr = Array.from(document.getElementsByClassName("product_number"));
  arrItemTotalPrice = Array.from(document.getElementsByClassName("total_product_price"));
  /* Get total amount to be payed */
  calculate_total_price(device);
  /* Get device of prices */
  /* Get cart items */
  arrCartItems = Array.from(document.getElementsByClassName("cart_item"));
  
  /*------------------------------ Checkpoint features ------------------------*/
  /* Like feature */
  arrLikeBtns = Array.from(document.getElementsByClassName("fa-heart"));
  for(let likeBtn of arrLikeBtns)
  {
    likeBtn.addEventListener('click', function(){mark_item_liked(likeBtn)});
  }
  
  /* Remove aricle feature */
  arrTrushBtns = Array.from(document.getElementsByClassName("fa-trash-alt"));
  for(let i=0; i<arrTrushBtns.length; i++)
  {
    arrTrushBtns[i].addEventListener('click', function(){remove_item(arrCartItems[i])});
  }
  
  /* Increment item number feature */
  arrAddIcon = Array.from(document.getElementsByClassName("fa-plus-square"));
  for(let i=0; i<arrAddIcon.length; i++)
  { 
    arrAddIcon[i].addEventListener('click',
                                   function(){increment_cart_item_number(
                                                arrItemNbr[i],
                                                arrItemPrice[i],
                                                arrItemTotalPrice[i])});
  }

  /* Decrement item number feature */
  arrMinos = Array.from(document.getElementsByClassName("fa-minus-square"));
  for(let i=0; i<arrMinos.length; i++)
  {
    arrMinos[i].addEventListener('click',
                                 function(){decrement_cart_item_number(
                                              arrItemNbr[i],
                                              arrItemPrice[i],
                                              arrItemTotalPrice[i],
                                              arrCartItems[i])});
  }
}

/*---------------------------------------------------------------------------*/
/* Main ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

init();
