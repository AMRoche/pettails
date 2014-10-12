<?php

require('includes/config.php');
require('includes/paypal.php');
var_dump($config);
$paypal = new PayPal($config);

$result = $paypal->call(array(
  'method'  => 'SetExpressCheckout',
  'paymentrequest_0_paymentaction' => 'sale',
  'paymentrequest_0_amt'  => $_GET['payment_types'],
  'paymentrequest_0_currencycode'  => 'GBP',
  'returnurl'  => 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']).'/success.php',
  'cancelurl'  => 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']).'/cancel.php',
));

if ($result['ACK'] == 'Success') {
  $paypal->redirect($result);
} else {
	header( 'Location: ../?failure=1' ) ;
//echo 'Handle the payment creation failure <br>';
}