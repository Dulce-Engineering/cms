import '/__/firebase/9.4.0/firebase-app-compat.js';
import '/__/firebase/9.4.0/firebase-functions-compat.js';
import '/__/firebase/init.js?useEmulator=true';

class Square
{
  async Init(appId, locationId, card_elem) 
  {
    this.locationId = locationId;
    const payments = window.Square.payments(appId, this.locationId);
    this.paymentMethod = await payments.card();
    await this.paymentMethod.attach(card_elem);
  }

  async Process_Payment(products) 
  {
    let res;

    const tokenResult = await this.paymentMethod.tokenize();
    if (tokenResult.status === 'OK') 
    {
      const Server_Process_Payment = firebase.functions().httpsCallable('Process_Payment');
      const data_products = products.map(p => ({id: p.id, quantity: p.quantity}));

      const data =
      {
        locationId: this.locationId,
        sourceId: tokenResult.token,
        products: data_products
      };
      const paymentResponse = await Server_Process_Payment(data);
      res = paymentResponse.data;
      //const body = JSON.stringify({locationId: this.locationId, sourceId: tokenResult.token});
      //const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body};
      //const paymentResponse = await fetch('/payment', options);
    }

    return res;
  }
}

export default Square;
