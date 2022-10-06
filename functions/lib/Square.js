import crypto from 'crypto'; //.webcrypto;
import De_Product from './De_Product';
import { Client, Environment } from 'square';

/*const config = 
{
  environment: Environment.Production : Environment.Sandbox,
  accessToken: SQUARE_ACCESS_TOKEN
};*/

class Square
{
  constructor(db, is_prod, token)
  {
    this.db = db;
    const config = 
    {
      environment: is_prod ? Environment.Production : Environment.Sandbox,
      accessToken: token
    };
    this.client = new Client(config);
    this.Process_Payment = this.Process_Payment.bind(this);
  }

  async Process_Payment(data)
  {
    //console.log("Square.Process_Payment(): data =", data);
    const res =
    {
      success: false
    };
    let pay_res;

    let amount = 0;
    for (const product of data.products)
    {
      const prod_details = await De_Product.Select_By_Id(this.db, product.id);
      amount += prod_details.price * product.quantity * 100;
    }
    const payment = 
    {
      idempotencyKey: data.idempotencyKey || Square.Payment_Id(),
      locationId: data.locationId,
      sourceId: data.sourceId,
      amountMoney: {amount, currency: 'AUD'}
    };
    if (data.customerId) 
    {
      payment.customerId = data.customerId;
    }
    if (data.verificationToken) 
    {
      payment.verificationToken = data.verificationToken;
    }
    //console.log("Square.Process_Payment(): payment =", payment);

    try {pay_res = await this.client.paymentsApi.createPayment(payment);}
    catch (error)
    {
      //console.log("Square.Process_Payment(): error.body entries =", Object.keys(error.body));
      const body = JSON.parse(error.body);
      const errors = body.errors.map(e => ({code: e.code, detail: e.detail, system: "square"}));
      res.errors = errors;
    }

    if (pay_res?.statusCode == 200)
    {
      res.success = true;
      res.order_id = pay_res.result.payment.orderId;
      res.amount = amount/100;
    }
    //console.log("Square.Process_Payment(): res =", res);

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

export default Square;
