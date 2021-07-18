import De_Table from "./De_Table.js";
import De_Component from "../lib/De_Component.js"
import De_Project from "../lib/De_Project.js"
import De_Db_Firestore from "../lib/De_Db_Firestore.js"
import Utils from "../lib/Utils.js";

class De_Table_Component extends De_Table 
{
  constructor() 
  {
    super("De_Table_Component");

    this.orderByCode = null;
    this.filters = null;
    this.db = new De_Db_Firestore();
    this.hasMultiSelect = true;

    this.Del_Option_On_Click = this.Del_Option_On_Click.bind(this);
    this.Add_Option_On_Click = this.Add_Option_On_Click.bind(this);
    this.Columns_Option_On_Click = this.Columns_Option_On_Click.bind(this);
    this.Col_Dlg_OK_Click = this.Col_Dlg_OK_Click.bind(this);
  }

  set orderBy(orderByCode)
  {
    this.orderByCode = orderByCode;
    this.updateRender();
  }

  set where(filters)
  {
    this.filters = filters;
    this.updateRender();
  }

  getColumns()
  {
    const columns = 
    [
      {title: "Id"},
      {title: "Title"},
      {title: "Key"},
      {title: "Type"},
      {title: "Content"},
      {title: "Project"}
    ];

    return columns;
  }

  async getRows()
  {
    let res;

    try
    {
      res = await De_Component.Select_All(this.db, this.orderByCode, this.filters);
    }
    catch (e) 
    {
      Utils.Handle_Errors(this.db);
    }

    return res;
  }

  getRowActions(row_elem, component)
  {
    const items = 
    [
      //{label: 'View', action: this.View_Option_On_Click, data: {id: component.id}},
      //{label: 'Project', action: this.Project_Option_On_Click, data: {id: component.id}},
      {label: 'Edit', action: this.Edit_Option_On_Click, data: {id: component.id}},
      {label: 'Delete', action: this.Del_Option_On_Click, data: {id: component.id}},
    ];

    return items;
  }

  Get_Table_Actions()
  {
    const items = 
    [
      {label: 'Add Text Component', action: this.Add_Option_On_Click, data: "text"},
      {label: 'Add HTML Component', action: this.Add_Option_On_Click, data: "html"},
      this.Columns_Option(),
      {label: 'Filter'},
      {label: 'Sort'},
      {label: 'Delete Selected', action: this.Add_Option_On_Click, data: "del_sel"},
    ];

    return items;
  }

  async getCellData(col_idx, component, row_elem)
  {
    let res = "";

    switch(col_idx)
    {
      case 0: // Id
        res = component.id;
        break;

      case 1: // Title
        res = component.title;
        break;

      case 2: // Key
        res = component.key;
        break;

      case 3: // Type
        res = component.content_type;
        break;

      case 4: // Content
        res = Utils.Abbreviate(component.content);
        break;

      case 5: // Project
        const project = await De_Project.Select_By_Id(this.db, component.project_id);
        res = project.title;
        break;
    }

    return res;
  }

  async Add_Option_On_Click(event)
  {
    const data = event.target.item_data;
    let url;

    if (data == "text")
    {
      url = "component_text.html";
      url = Utils.Add_Param(url, "project_id", Utils.Get_Param("project_id"));
      window.open(url, "_self");
    }
    else if (data == "html")
    {
      url = "component_html.html";
      url = Utils.Add_Param(url, "project_id", Utils.Get_Param("project_id"));
      window.open(url, "_self");
    }
    else if (data == "del_sel")
    {
      const msg = "Are you sure?";
      if (window.confirm(msg))
      {
        const selected_elems = this.Get_Selected();
        for (const elem of selected_elems)
        {
          const is_deleted = await De_Component.Delete(this.db, elem.row_data.id);
          if (!is_deleted)
          {
            Utils.Handle_Errors(this.db);
            break;
          }
        }
        this.updateRender();
      }
    }
  }

  async Edit_Option_On_Click(event)
  {
    const data = event.target.item_data;

    let url = Utils.Add_Param("component_text.html", "project_id", Utils.Get_Param("project_id"));
    url = Utils.Add_Param(url, "id", data.id);
    window.open(url, "_self");
  }

  async View_Option_On_Click(event)
  {
  }

  async Project_Option_On_Click(event)
  {
    const data = event.target.item_data;
    window.open("project.html", "_self");
  }

  async Del_Option_On_Click(event)
  {
    const data = event.target.item_data;

    const confirmed = window.confirm("Are you sure?");
    if (confirmed)
    {
      const is_deleted = await De_Component.Delete(this.db, data.id);
      if (is_deleted)
      {
        this.updateRender();
      }
      else
      {
        Utils.Handle_Errors(this.db);
      }
    }
  }
}

export default De_Table_Component;