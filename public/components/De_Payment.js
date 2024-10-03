import "https://sandbox.web.squarecdn.com/v1/square.js";
import 'https://www.paypalobjects.com/api/checkout.js';
import Utils from "../lib/Utils.js";
import Square from "../lib/Square.js";

class De_Payment extends HTMLElement 
{
  static tname = "de-payment";

  constructor() 
  {
    super();
    this.square = new Square();
    this.active_pay_elem = null;

    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  //static observedAttributes = ["attr-name"];
  attributeChangedCallback(attrName, oldValue, newValue)
  {

  }

  Pay(products)
  {
    let res;

    if (this.active_pay_elem == this.pt_cc)
    {
      res = this.square.Process_Payment(products);
    }
    else if (this.active_pay_elem == this.pt_paypal)
    {
      res = new Promise((res_fn, rej_fn) => this.On_Pay_PP(res_fn, rej_fn, products));
    }

    return res;
  }

  // events =======================================================================================

  On_Pay_PP(res_fn, rej_fn, products)
  {
    this.total = products.reduce((t, p) => t += p.quantity * p.price, 0);

    this.pay_res_fn = res_fn;
    this.pay_rej_fn = rej_fn;
    const pp_det = {transactions: [{amount: {total: this.total, currency: 'AUD'}}]};
    this.pp_res_fn(this.pp_actions.payment.create(pp_det));
  }

  async On_PP_Authorize(data, actions) 
  {
    await actions.payment.execute();
    this.pay_res_fn({success: true, amount: this.total});
  }

  On_Start_PP_Payment(res_fn, rej_fn)
  {
    this.pp_res_fn = res_fn;
    this.pp_rej_fn = rej_fn;
    const pay = new Event('pay');
    this.dispatchEvent(pay);
  }

  async On_Click_CC_Pay_Btn()
  {
    const pay = new Event('pay');
    this.dispatchEvent(pay);
  }

  async On_Click_PP_Pay_Btn(data, actions)
  {
    this.pp_actions = actions;
    return new Promise(this.On_Start_PP_Payment);
  }

  On_Change_Pay_Type(event)
  {
    this.active_pay_elem = event.target;
    this.Update_Pay_Type();
  }

  // rendering ====================================================================================

  Update_Pay_Type()
  {
    const radio = this.active_pay_elem;;

    this.det_paypal.style.display = "none";
    this.det_cc.style.display = "none";
    this.det_afterpay.style.display = "none";

    const show_id = radio.getAttribute("show-id");
    const show_elem = this.querySelector("#" + show_id);
    if (radio.checked)
    {
      show_elem.style.display = "block";
    }
    else
    {
      show_elem.style.display = "none";
    }
  }

  Render()
  {
    const html = `
      <ul>
        <li>
          <input id="pt_paypal" type="radio" name="pay_type" show-id="det_paypal">
          <label for="pt_paypal">Paypal</label>
          <div id="det_paypal" style="display:none;">
            <span id="paypal_btn"></span>
          </div>
        </li>
        <li>
          <input id="pt_cc" type="radio" name="pay_type" show-id="det_cc">
          <label for="pt_cc">Credit Card</label>
          <div id="det_cc" style="display:none;">
            <div id="cc_div"></div>
            <button id="pay_btn">Place Order</button>
          </div>
        </li>
        <li>
          <input id="pt_afterpay" type="radio" name="pay_type" show-id="det_afterpay">
          <label for="pt_afterpay">Afterpay</label>
          <div id="det_afterpay" style="display:none;">
            to do
          </div>
        </li>
      </ul>
    `;
    const doc = Utils.toDocument(html);
    this.append(doc);

    Utils.Set_Id_Shortcuts(this, this);

    this.pt_paypal.addEventListener("change", this.On_Change_Pay_Type);
    this.pt_cc.addEventListener("change", this.On_Change_Pay_Type);
    this.pt_afterpay.addEventListener("change", this.On_Change_Pay_Type);

    this.pay_btn.addEventListener("click", this.On_Click_CC_Pay_Btn);
    const appId = 'sandbox-sq0idb-CNQ94Dzj8pmDeQ9wsi94WA';
    const locationId = 'LDMH1XZKVK4C9';
    this.square.Init(appId, locationId, this.cc_div);

    const paypal_btn_optons =
    {
      env: 'sandbox',
      client: {
        sandbox: 'AYl1KY-Sosty44DPGO2DgNu5avF4Cihz7dUrMkHge8xiov1C98uRMeZb0wUDg5lpHYc0AlbxUNaldWzu',
        production: 'demo_production_client_id'
      },
      locale: 'en_US',
      style: {size: 'small', color: 'gold', shape: 'pill'},
      commit: true,
      payment: this.On_Click_PP_Pay_Btn,
      onAuthorize: this.On_PP_Authorize
    };
    paypal.Button.render(paypal_btn_optons, '#paypal_btn');

  }
}

export default De_Payment;