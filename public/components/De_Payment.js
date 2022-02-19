import "https://sandbox.web.squarecdn.com/v1/square.js";
import Utils from "../lib/Utils.js";
import Square from "../lib/Square.js";

class De_Payment extends HTMLElement 
{
  static tname = "de-payment";

  constructor() 
  {
    super();
    this.square = new Square();

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
    return this.square.Process_Payment(products);
  }

  // events =======================================================================================

  async On_Click_Pay_Btn()
  {
    const pay = new Event('pay');
    this.dispatchEvent(pay);
  }

  On_Change_Pay_Type(event)
  {
    const radio = event.target;

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

  // rendering ====================================================================================

  Render()
  {
    const html = `
      <ul>
        <li>
          <input id="pt_paypal" type="radio" name="pay_type" show-id="det_paypal">
          <label for="pt_paypal">Paypal</label>
          <div id="det_paypal" style="display:none;">
            to do
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

    this.pay_btn.addEventListener("click", this.On_Click_Pay_Btn);
    const appId = 'sandbox-sq0idb-CNQ94Dzj8pmDeQ9wsi94WA';
    const locationId = 'LDMH1XZKVK4C9';
    this.square.Init(appId, locationId, this.cc_div);
  }
}

export default De_Payment;