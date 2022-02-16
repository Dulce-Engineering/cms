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

  async Process_Payment(event) 
  {
    let res;

    const tokenResult = await this.paymentMethod.tokenize();
    if (tokenResult.status === 'OK') 
    {
      const Server_Process_Payment = firebase.functions().httpsCallable('Process_Payment');

      const payload =
      {
        locationId: this.locationId,
        sourceId: tokenResult.token,
        amount: "100",
        currency: "AUD"
      };
      const paymentResponse = await Server_Process_Payment(payload);
      res = paymentResponse.data;
      //const body = JSON.stringify({locationId: this.locationId, sourceId: tokenResult.token});
      //const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body};
      //const paymentResponse = await fetch('/payment', options);
    }

    return paymentResponse;
  }
}

export default Square;
