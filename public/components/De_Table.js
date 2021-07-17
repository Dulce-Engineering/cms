import Utils from "../lib/Utils.js";
import De_Dropdown from "./De_Dropdown.js"
import De_Dialog_Cols from "./De_Dialog_Cols.js";

class De_Table extends HTMLElement 
{
  constructor(storage_key) 
  {
    super();
    
    this.storage_key = storage_key;
    this.withRowNo = false;
    this.auto_start = true;
    this.hasMultiSelect = false;
    this.updateEvent = new Event("update");
    this.visible_cols = Utils.getFromLocalStorgeJson(this.storage_key + ".visible_cols", "{}");

    this.Columns_Option_On_Click = this.Columns_Option_On_Click.bind(this);
    this.Col_Dlg_OK_Click = this.Col_Dlg_OK_Click.bind(this);

    const rootElem = this.render();
    this.append(rootElem);
  }

  static get observedAttributes()
  {
    return ["auto-start"];
  }

  connectedCallback()
  {
    const columns = this.getColumns();

    this.renderHeaderColumns(columns);
    this.renderFooterCells(this.footerRowElem);

    if (this.auto_start)
    {
      this.updateRender();
    }
  }

  disconnectedCallback()
  {
  }

  adoptedCallback()
  {

  }

  attributeChangedCallback(attr_name, oldValue, new_value)
  {
    if (attr_name == "auto-start")
    {
      this.auto_start = Utils.toBoolean(new_value);
    }
  }

  // API ==========================================================================================

  getColumns()
  {
    const columns = 
    [
      {title: "Id"},
      {title: "Name"},
      {title: "Occupation"}
    ];

    return columns;
  }

  getRows()
  {
    const rows =
    [
      {id: 100, name: "Fred Flintstone", occupation: "Builder"},
      {id: 101, name: "Wilma Flintstone", occupation: "Housewife"},
      {id: 102, name: "Bambam Flintstone", occupation: "Student"}
    ];

    return rows;
  }

  getRowData(row)
  {
    return row;
  }

  getCellData(colIdx, rowData)
  {
    let res;

    switch(colIdx)
    {
      case 0: res = rowData.id; break;
      case 1: res = rowData.name; break;
      case 2: res = rowData.occupation; break;
    }

    return res;
  }

  getRowActions(row_elem, project)
  {

  }

  Get_Table_Actions()
  {

  }

  showFetching()
  {

  }

  showFetchingCompleted()
  {

  }

  Get_Selected()
  {
    let res;

    const checkbox_elems = this.querySelectorAll("[is-row-checkbox]");
    if (!Utils.isEmpty(checkbox_elems))
    {
      const array_elems = Array.from(checkbox_elems);
      res = array_elems.filter(e => e.checked);
    }

    return res;
  }

  // rendering ====================================================================================

  render()
  {
    const html = 
    `<div id="tableContainer">
      <table id="tableElem">
        <thead><tr id="headerRowElem"></tr></thead>
        <tbody id="bodyElem">
          <tr id="loading_row"><td id="loading_cell">Loading data...</td></tr>
        </tbody>
        <tfoot><tr id="footerRowElem"></tr></tfoot>
      </table>
    </div>`;
    const tableElem = Utils.toDocument(html);

    this.headerRowElem = tableElem.getElementById("headerRowElem");
    this.bodyElem = tableElem.getElementById("bodyElem");
    this.footerRowElem = tableElem.getElementById("footerRowElem");

    const loading_cell = tableElem.getElementById("loading_cell");
    loading_cell.colSpan = this.getColumnsCount() + 1;

    return tableElem;
  }

  On_Render()
  {

  }

  async updateRender()
  {
    const columns = this.getColumns();
    this.showFetching();
    const rows = await this.getRows();
    this.showFetchingCompleted();

    this.updateRenderHeaderColumns(columns);
    this.updateRenderBodyRows(columns, rows);

    this.dispatchEvent(this.updateEvent);
  }
  
  updateRenderHeaderColumns(columns)
  {
    const menuItems = this.Get_Table_Actions();
    if (!Utils.isEmpty(menuItems))
    {
      const action_menu = this.Render_Action_Menu(menuItems);
      this.actionHeaderCell.replaceChildren(...action_menu);
    }

    for (let i = 0; i < columns.length; i++)
    {
      const column = columns[i];
      this.updateRenderHeaderCell(column, i);
    }
  }

  updateRenderHeaderCell(column, idx)
  {
  }

  async updateRenderBodyRows(columns, rows)
  {
    rows = await rows;
    this.removeChildren(this.bodyElem);
    if (rows)
    {
      for (const row of rows)
      {
        const rowData = await this.getRowData(row);
        const rowElem = await this.renderRow(columns, rowData);
        this.bodyElem.append(rowElem);
      }
    }
    else
    {
      this.renderRowMsg("Nothing to show.");
    }
  }

  renderHeaderColumns(columns)
  {
    this.removeChildren(this.headerRowElem);

    this.actionHeaderCell = document.createElement("th");
    this.headerRowElem.append(this.actionHeaderCell);

    for (let i = 0; i < columns.length; i++)
    {
      const column = columns[i];
      if (this.Is_Col_Visible(i))
      {
        const cellElem = this.renderHeaderCell(column, i);
        this.headerRowElem.append(cellElem);
      }
    }
  }

  renderHeaderCell(column, idx)
  {
    const titleElem = document.createElement("th");
    this.renderAsType(column.renderAs, titleElem, column.title);
    titleElem.id = "title_" + idx;

    return titleElem;
  }

  async renderRow(columns, rowData)
  {
    const row_elem = document.createElement("tr");

    const menuItems = this.getRowActions(row_elem, rowData);
    const hasActionCol = !Utils.isEmpty(menuItems) || this.hasMultiSelect;
    if (hasActionCol)
    {
      const cell_elem = document.createElement("td");
      cell_elem.style.whiteSpace = "nowrap";
      row_elem.append(cell_elem);

      if (!Utils.isEmpty(menuItems))
      {
        const action_menu = this.Render_Action_Menu(menuItems);
        cell_elem.append(...action_menu);
      }
      if (this.hasMultiSelect)
      {
        const check_elem = document.createElement("input");
        check_elem.type = "checkbox";
        check_elem.setAttribute("is-row-checkbox", true);
        check_elem.row_data = rowData;
        cell_elem.append(check_elem);
      }
    }

    for (let i = 0; i < columns.length; i++)
    {
      const column = columns[i];
      if (this.Is_Col_Visible(i))
      {
        const cellData = await this.getCellData(i, rowData, row_elem);
        const cellElem = this.renderCell(column, cellData);
        row_elem.append(cellElem);
      }
    }

    return row_elem;
  }

  renderRowMsg(msg, columns)
  {
    this.removeChildren(this.bodyElem);

    const cell_elem = document.createElement("td");
    cell_elem.innerText = msg;

    const row_elem = document.createElement("tr");
    row_elem.append(cell_elem);

    this.bodyElem.append(row_elem);
  }

  Render_Action_Menu(items)
  {
    const menu_btn = document.createElement("button");
    menu_btn.innerHTML = "&equiv;";

    const menu_elem = new De_Dropdown();
    menu_elem.items = items;
    menu_elem.srcElem = menu_btn;

    return [menu_btn, menu_elem]; 
  }

  renderCell(column, cellData)
  {
    const cellElem = document.createElement("td");
    this.renderAsType(column.renderAs, cellElem, cellData);

    return cellElem;
  }

  renderFooterCells(parentElem)
  {
  }

  renderAsType(type, dstElem, data)
  {
    if (type == "text")
    {
      dstElem.innerText = data;
    }
    else if (type == "html")
    {
      dstElem.innerHTML = data;
    }
    else if (Array.isArray(data))
    {
      for (const elem of data)
      {
        dstElem.append(elem);
      }
    }
    else
    {
      dstElem.append(data);
    }
  }

  // Misc =========================================================================================

  Columns_Option()
  {
    return {label: 'Columns', action: this.Columns_Option_On_Click};
  }

  Columns_Option_On_Click(event)
  {
    const columns = this.getColumns();
    for (let i = 0; i < columns.length; i++)
    {
      const column = columns[i];
      column.visible = this.Is_Col_Visible(i);
    }

    const menu_option_rect = event.target.getBoundingClientRect();
    const left = menu_option_rect.right;
    const top = menu_option_rect.top;
    De_Dialog_Cols.Show(this.Col_Dlg_OK_Click, columns, left, top);
    event.stopPropagation();
  }

  Col_Dlg_OK_Click(columns)
  {
    if (!Utils.isEmpty(columns))
    {
      for (let i = 0; i < columns.length; i++)
      {
        const column = columns[i];
        this.Set_Col_Vis(i, column.visible);
      }
      localStorage.setItem(this.storage_key + ".visible_cols", JSON.stringify(this.visible_cols));

      this.renderHeaderColumns(columns);
      this.updateRender();
    }
  }

  Is_Col_Visible(i)
  {
    return this.visible_cols[i] == undefined || this.visible_cols[i] == true;
  }

  Set_Col_Vis(col_idx, visible)
  {
    this.visible_cols[col_idx] = visible;
  }

  getColumnsCount()
  {
    let res = 0;

    const cols = this.getColumns();
    if (!Utils.isEmpty(cols))
    {
      res = cols.length;
    }

    return res;
  }

  removeChildren(elem)
  {
    while (elem.firstChild) 
    {
      elem.removeChild(elem.lastChild);
    }
  }
}

export default De_Table;