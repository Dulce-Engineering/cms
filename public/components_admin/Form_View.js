import Context from "../lib/Context.js";
import Utils from "../lib/Utils.js";

class Form_View extends HTMLElement
{
  static tname = "form-view";

  constructor()
  {
    super();

    this.obj = null;
    this.ctx = new Context();
    this.urlParams = new URLSearchParams(window.location.search);

    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
    this.Main();
  }

  // init and auth ============================================================================

  Render()
  {
    const html = `
      <header-buddy id="header_elem" title="CMS - Component - Link" style-src="styles/Header_Buddy.css"></header-buddy>
      <form id="form">
        <label></label>
        <span>
          <button id="ok_btn" class="button">OK</button>
          <button id="cancel_btn" class="button">Cancel</button>
        </span>
      </form>
    `;
    const doc = Utils.toDocument(html);

    const form_elem = doc.getElementById("form");
    form_elem.prepend(...this.childNodes);

    this.replaceChildren(doc);
  }

  Main()
  {
    this.ctx.Init(this.On_Header_Signed_In, this.On_Header_Signed_Out, this);
  }

  async On_Header_Signed_In()
  {
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

  static Disable(id)
  {
    const elem = document.getElementById(id);
    if (elem)
    {
      elem.disabled = true;
    }
  }

  On_Header_Signed_Out()
  {
    this.obj = this.New_Obj();
    this.Obj_To_Fields(this.obj);
    Context.Toast_Show("You must sign in.", "warning");
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
    //window.history.back();
    window.close();
    window.opener.Page_Refresh();
  }

  async On_Click_Save(event)
  {
    event.preventDefault();
    this.Fields_To_Obj(this.obj);
    const is_saved = await this.Save_Obj(this.obj);
    if (is_saved)
    {
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
    this.Return_To_Page();
  }
}

export default Form_View;