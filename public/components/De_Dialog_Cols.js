import Utils from "../lib/Utils.js";
import De_Dialog from "./De_Dialog.js";

class De_Dialog_Cols extends De_Dialog 
{
  constructor() 
  {
    super();
  }

  Set_Columns(columns)
  {
    this.columns = columns;

    const body_elems = this.Render_Body();
    const body_div = this.querySelector("#body_div");
    body_div.append(...body_elems);
  }

  static Show(On_OK_Fn, columns, left, top)
  {
    const dlg_elem = new De_Dialog_Cols();
    dlg_elem.On_OK_Fn = On_OK_Fn;
    dlg_elem.Set_Columns(columns);

    document.body.append(dlg_elem);
    dlg_elem.style.left = left + "px";
    dlg_elem.style.top = top + "px";
    dlg_elem.Show();
  }

  On_Click_OK(event)
  {
    for (let i = 0; i < this.columns.length; i++)
    {
      const column = this.columns[i];
      column.visible = column.checkbox.checked;
    }
    this.On_OK_Fn(this.columns);
    this.Hide();
  }

  Render_Body()
  {
    const res = [];

    for (let i = 0; i < this.columns.length; i++)
    {
      const column = this.columns[i];

      const label_elem = document.createElement("label");
      label_elem.for = "col_" + i;
      label_elem.innerText = column.title;
      res.push(label_elem);

      const checkbox = document.createElement("input");
      checkbox.id = "col_" + i;
      checkbox.type = "checkbox";
      checkbox.checked = column.visible;
      res.push(checkbox);

      column.checkbox = checkbox;
    }

    return res;
  }
}

export default De_Dialog_Cols;