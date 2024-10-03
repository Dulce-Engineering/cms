import Context from "../lib/Context.js";
import Utils from "../lib/Utils.js";
import "./Menu_Header.js";

class Form_View extends HTMLElement
{
  static tname = "form-view";

  constructor()
  {
    super();

    this.obj = null;
    this.ctx = new Context();
    this.urlParams = new URLSearchParams(window.location.search);
    this.result = null;
    this.user = null;

    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
    this.Main();
    this.hidden = false;
  }

  // init and auth ============================================================================

  Render()
  {
    const html = `
      <menu-header id="mh_elem" title="Component"></menu-header>
      <form id="form">
        <label class="empty"></label>
        <span class="btn-panel">
          <button id="ok_btn" class="button-primary" type="button">Save</button>
          <button id="cancel_btn" class="button-secondary" type="button">Cancel</button>
        </span>
      </form>
    `;
    const doc = Utils.toDocument(html);

    const form_elem = doc.getElementById("form");
    form_elem.prepend(...this.childNodes);

    this.replaceChildren(doc);
    Utils.Set_Id_Shortcuts(this, this);
  }

  Main()
  {
    //this.ctx.Init(this.On_Header_Signed_In, this.On_Header_Signed_Out, this);
    this.mh_elem.addEventListener("signedin", this.On_Header_Signed_In);
    this.mh_elem.addEventListener("signedout", this.On_Header_Signed_Out);
    this.mh_elem.Start();
  }

  async On_Header_Signed_In()
  {
    this.user = this.header_elem.user;
    const id = this.urlParams.get('id');
    if (id)
    {
      this.obj = await this.Load_Obj(id);
    }
    else
    {
      this.obj = await this.New_Obj();
    }

    await this.Prepare_Fields(this.obj);

    // populate fields
    this.Obj_To_Fields(this.obj);

    this.ok_btn.addEventListener("click", this.On_Click_Save);
    this.cancel_btn.addEventListener("click", this.On_Click_Cancel);
  }

  On_Header_Signed_Out()
  {
    this.user = null;
    this.obj = this.New_Obj();
    this.Obj_To_Fields(this.obj);
    this.ctx.Toast_Show("You must sign in.", "warning");
  }

  static Set_Options(elem, objs, value_field, label_field)
  {
    if (!Utils.isEmpty(objs))
    {
      for (const obj of objs)
      {
        const option_elem = document.createElement("option");
        option_elem.value = obj[value_field];
        option_elem.innerText = obj[label_field];
        elem.append(option_elem);
      }
    }
  }

  // fields ===================================================================================

  Load_Obj(id)
  {
  }

  New_Obj()
  {
  }

  Save_Obj()
  {
  }

  async Prepare_Fields(obj)
  {
  }

  Obj_To_Fields()
  {
  }

  Fields_To_Obj()
  {
  }

  // button footer ============================================================================

  Return_To_Page()
  {
    if (window.opener && window.opener.Page_Refresh)
    {
      window.opener.Page_Refresh(this.result);
    }
  }

  async On_Click_Save(event)
  {
    event.preventDefault();
    this.Fields_To_Obj(this.obj);
    const is_saved = await this.Save_Obj(this.obj);
    if (is_saved)
    {
      this.result = "save";
      this.Return_To_Page();
    }
    else
    {
      Utils.Handle_Errors(this.ctx.db);
    }
  }

  On_Click_Cancel(event)
  {
    event.preventDefault();
    this.result = "cancel";
    this.Return_To_Page();
  }
}

export default Form_View;