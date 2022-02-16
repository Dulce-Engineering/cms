const crypto = require('crypto').webcrypto;
const { Client, Environment } = require('square');

/*const config = 
{
  environment: Environment.Production : Environment.Sandbox,
  accessToken: SQUARE_ACCESS_TOKEN
};*/

class Square
{
  constructor(is_prod, token)
  {
    const config = 
    {
      environment: is_prod ? Environment.Production : Environment.Sandbox,
      accessToken: token
    };
    this.client = new Client(config);
    this.Process_Payment = this.Process_Payment.bind(this);
  }

  async Process_Payment(payload)
  {
    const res =
    {
      success: false
    };

    const payment = 
    {
      idempotencyKey: payload.idempotencyKey || Square.Payment_Id(),
      locationId: payload.locationId,
      sourceId: payload.sourceId,
      amountMoney: 
      {
        amount: '100', //payload.amount,
        currency: 'AUD' //payload.curency
      }
    };
    if (payload.customerId) 
    {
      payment.customerId = payload.customerId;
    }
    if (payload.verificationToken) 
    {
      payment.verificationToken = payload.verificationToken;
    }
    console.log("Square.Process_Payment(): payload =", payload);

    const pay_res = await this.client.paymentsApi.createPayment(payment);
    if (pay_res.statusCode == 200)
    {
      res.success = true;
      res.order_id = pay_res.result.payment.orderId;
    }
    console.log("Square.Process_Payment(): res =", res);

    return res;
  }

  static Payment_Id()
  {
    let t = 21, res = "", random_values = crypto.getRandomValues(new Uint8Array(t));

    for (; t--; )
    {
      let n = 63 & random_values[t];
      res += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? "_" : "-";
    }
    return res
  }
}

module.exports = Square;