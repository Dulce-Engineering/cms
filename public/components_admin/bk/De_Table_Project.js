import De_Table from "./De_Table.js";
import De_Project from "../lib/De_Project.js"
import De_Db_Firestore from "../lib/De_Db_Firestore.js"

class De_Table_Project extends De_Table 
{
  constructor() 
  {
    super("De_Table_Project");
    this.orderByCode = null;
    this.filters = null;
    this.db = new De_Db_Firestore();

    this.Del_Option_On_Click = this.Del_Option_On_Click.bind(this);
    this.On_Auth_State_Changed = this.On_Auth_State_Changed.bind(this);

    this.db.auth.onAuthStateChanged(this.On_Auth_State_Changed);
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
      {title: "URL"},
    ];

    return columns;
  }

  getRows()
  {
    //return De_Project.Select_All(this.db, this.orderByCode, this.filters);
    return De_Project.Select_All_By_User(this.db, this.orderByCode, this.filters);
  }

  getRowActions(row_elem, project)
  {
    const items = 
    [
      //{label: 'View', action: this.View_Option_On_Click, data: {id: project.id}},
      {label: 'Components', action: this.Components_Option_On_Click, data: {id: project.id}},
      {label: 'Edit', action: this.Edit_Option_On_Click, data: {id: project.id}},
      {label: 'Delete', action: this.Del_Option_On_Click, data: {id: project.id}},
    ];

    return items;
  }

  Get_Table_Actions()
  {
    const items = 
    [
      {label: 'Add', action: this.Add_Option_On_Click},
      this.Columns_Option(),
      {label: 'Filter'},
      {label: 'Sort'},
    ];

    return items;
  }

  getCellData(col_idx, project, row_elem)
  {
    let res = "";

    switch(col_idx)
    {
      case 0: // Id
        res = project.id;
        break;

      case 1: // Title
        res = project.title;
        break;

      case 2: // Key
        res = project.key;
        break;

      case 3: // URL
        const a_elem = document.createElement("a");
        a_elem.href = project.url;
        a_elem.innerText = project.url;
        a_elem.target = "_blank";
        res = a_elem;
        break;
    }

    return res;
  }

  showFetching()
  {
    this.renderRowMsg("Please wait...");
  }

  showFetchingCompleted()
  {

  }

  On_Auth_State_Changed()
  {
    this.updateRender();
  }

  Add_Option_On_Click(event)
  {
    window.open("project.html", "_self");
  }

  async Edit_Option_On_Click(event)
  {
    const data = event.target.item_data;
    window.open("project.html?id=" + data.id, "_self");
  }

  async View_Option_On_Click(event)
  {
  }

  async Components_Option_On_Click(event)
  {
    const data = event.target.item_data;
    window.open("components.html?project_id=" + data.id, "_self");
  }

  async Del_Option_On_Click(event)
  {
    const data = event.target.item_data;

    const confirmed = window.confirm("Are you sure?");
    if (confirmed)
    {
      const is_deleted = await De_Project.Delete(this.db, data.id);
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

export default De_Table_Project;