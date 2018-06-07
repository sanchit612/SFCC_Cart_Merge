CartModel.get = function (parameter) {
    var basket = null;

    if (!parameter) {

        var currentBasket = BasketMgr.getCurrentBasket();
        
        var storedBasket = BasketMgr.getStoredBasket();
        
        var newBasket = currentBasket;
        
       if (storedBasket !== null) {
        	
    	   var product_seq;
    	   var list = storedBasket.getAllProductLineItems().iterator();
        //	var list = storedBasket.getAllLineItems().iterator();
        	while(list.hasNext())
        	{
        		product_seq = list.next();
        		var txn = require('dw/system/Transaction');
        		txn.begin();        		
        		newBasket.createProductLineItem(product_seq.productID, newBasket.getDefaultShipment());
        		txn.commit();
        	}
        }
       
            if (newBasket !== null) {
            basket = newBasket;
        }

//        if (currentBasket !== null) {
//            basket = currentBasket;
//        }

    } else if (typeof parameter === 'object') {
        basket = parameter;
    }
    return (basket !== null) ? new CartModel(basket) : null;
};
