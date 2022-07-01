import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';


export function openAction(evt, actionName){
    let i, actioncontent, actionlinks;
    actioncontent = document.getElementsByClassName("actionContent");
    for (i = 0; i < actioncontent.length; i++) {
        actioncontent[i].style.display = "none";
    }
    actionlinks = document.getElementsByClassName("action-links");
    for (i = 0; i < actionlinks.length; i++) {
        actionlinks[i].className = actionlinks[i].className.replace(" active", "");
    }
    document.getElementById(actionName).style.display = "block";
    document.getElementById('profileInstruction').style.display = "none";
    evt.currentTarget.className += " active";
  };

  export function loadSpinner(){
    document.getElementById('show-spinner').style.display = " block";
  }

  export function unloadSpinner(){
    document.getElementById('show-spinner').style.display = " none";
  }

  export function loadToast(msg, toast_type){
    this.show = true
    this.message = msg
    this.type = toast_type

    setTimeout(()=>{
          this.type = null
          this.message = null
        }, 6000)
  }

  export function comparePasswords(){
    const pass_one = document.getElementById('password');
    const pass_two = document.getElementById('confirm-password');

    if(pass_one.value === pass_two.value){
      pass_one.style.border = "2px solid  #2C974B";
      pass_two.style.border = "2px solid  #2C974B";
      return true;
    }
    pass_one.style.border = "2px solid  #b8251b";
    pass_two.style.border = "2px solid  #b8251b";
    return false;
  }

  export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  // various reports will go below here
  // excel and pdf reports
  export function dailySalesReport(sales_data, column_data, screen_name){
  //work on a way of getting the sum of duplicate key value pairs

    if(sales_data){
      let total = sales_data.reduce((sum, el) => sum + el.total, 0);
      let totals = [{content: `Total = ${Number(total.toFixed(2)).toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]
  
      let new_data = [...sales_data.map(el => [
        el.item, 
        el.units_sold, 
        el.unit_price.toFixed(2), //return to two decimal places
        el.total.toFixed(2)]), totals]
  
    const addFooters = footer => {
      const pageCount = footer.internal.getNumberOfPages()
      footer.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        footer.setPage(i)
        footer.text('Page ' + String(i) + 
        ' of ' + String(pageCount),
         footer.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }
    const generationDate = new Date().toLocaleDateString('en-GB', {  
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  
    const drawCell = function(data) {
      let doc = data.doc;
      let rows = data.table.body;
      if (rows.length === 1) {
      } else if (data.row.index === rows.length - 1) {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize("12");
        doc.setTextColor(52,147,223);
        doc.setFillColor(255, 255, 255);
      }
    };
   
    const company = `CUTE EVE LIMITED`;
    const reportHeading = `Sales for ${generationDate} by  ${screen_name.toUpperCase()}`;

  
    let doc = new jsPDF()
    
    autoTable(doc, {
      body: new_data,
      columns: column_data,
      margin: { top:30, horizontal: 10 },
      headStyles: {fillColor: [0,150,214], font:'helvetica', fontStyle: 'bold'},
      bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
      theme: "grid",
      showHead: "everyPage",
      willDrawCell: drawCell,
      
      didDrawPage: function (data) {
      //Document Header
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'bold')
      doc.text([String(company), String(reportHeading)],10,10)
      }
    });
    addFooters(doc)
    doc.save(`Total sales for ${screen_name} report generated on ${generationDate}.pdf`)
  }
  }
  export function salesPerPerson(sales_data, columns_data,name, start_date, end_date){
    // everything sold by a particular person
    // on a particular date
  }

  export function salesReportByDate(sales_data,columns_data,start_date, end_date){
   

    if(sales_data){
      // sum of duplicate items
      const res = Array.from(sales_data.reduce((acc, {total, units_sold, ...r}) => {
      const key = JSON.stringify(r);
      const current = acc.get(key) || {...r, total: 0, units_sold: 0};  
        return acc.set(key, {...current, total: current.total + total, units_sold: current.units_sold + units_sold});
      }, new Map).values());

      let sales_total = res.reduce((sum, el) => sum + el.total, 0);
      let totals = [{content: `Total = ${Number(sales_total.toFixed(2)).toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]
  
      let new_data = [...res.map(el => [
        el.item, 
        el.units_sold, 
        el.unit_price.toFixed(2), 
        el.total.toFixed(2)]), totals]

  
    const addFooters = footer => {
      const pageCount = footer.internal.getNumberOfPages()
      footer.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        footer.setPage(i)
        footer.text('Page ' + String(i) + 
        ' of ' + String(pageCount),
         footer.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }
    const generationDate = new Date().toLocaleDateString('en-GB', {  
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  
    const drawCell = function(data) {
      let doc = data.doc;
      let rows = data.table.body;
      if (rows.length === 1) {
      } else if (data.row.index === rows.length - 1) {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize("12");
        doc.setTextColor(52,147,223);
        doc.setFillColor(255, 255, 255);
      }
    };
   
    const company = "CUTE EVE LIMITED";
    const reportHeading = `Report for sales between the dates of ${start_date} and ${end_date}`;

  
    let doc = new jsPDF()
    
    autoTable(doc, {
      body: new_data,
      columns: columns_data,
      margin: { top:30, horizontal: 10 },
      headStyles: {fillColor: [0,150,214], font:'helvetica', fontStyle: 'bold'},
      bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
      theme: "grid",
      showHead: "everyPage",
      willDrawCell: drawCell,
      
      didDrawPage: function (data) {
      //Document Header
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'bold')
      doc.text([String(company), String(reportHeading)],10,10)
      }
    });
    addFooters(doc)
    doc.save(`Report for sales between the dates of ${start_date} and ${end_date} report generated on ${generationDate}.pdf`)
  }
  }

  export function stockInShop(stock_data,columns_data){
    if(stock_data){
    let total = stock_data.reduce((sum, el) => sum + (el.units*el.buying_price), 0);
    let formatted_number = formatNumber(total.toFixed(2))// return a two decimal place answer
    let totals = [{content: `Value = ${formatted_number}`, colSpan: 4, styles:{halign:'center'}}]

    let new_data = [...stock_data.map((el) => [
      el.item, 
      el.units,
      el.buying_price.toFixed(2),
      (el.units*el.buying_price).toFixed(2)
    ]), totals]

  
    const addFooters = footer => {
      const pageCount = footer.internal.getNumberOfPages()
      footer.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        footer.setPage(i)
        footer.text('Page ' + String(i) + 
        ' of ' + String(pageCount),
         footer.internal.pageSize.width / 2, 287, {
          align: 'center'
        })
      }
    }
    const generationDate = new Date().toLocaleDateString('en-GB', {  
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  
    const drawCell = function(data) {
      let doc = data.doc;
      let rows = data.table.body;
      if (rows.length === 1) {
      } else if (data.row.index === rows.length - 1) {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize("12");
        doc.setTextColor(52,147,223);
        doc.setFillColor(255, 255, 255);
      }
    };
   
    const company = "CUTE EVE LIMITED";
    const reportHeading = `Stock in the shop as at ${generationDate}`;

  
    let doc = new jsPDF()
    // console.log(doc.getFontList());

    autoTable(doc, {
      body: new_data,
      columns: columns_data,
      margin: { top:30, horizontal: 10 },
      headStyles: {fillColor: [0,150,214], fontStyle: 'bold'},
      bodyStyles: {fontSize:8,font:'helvetica',fontStyle:'bold'},
      theme: "grid",
      showHead: "everyPage",
      willDrawCell: drawCell,
      
      didDrawPage: function (data) {
      //Document Header
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'bold')
      doc.text([String(company), String(reportHeading)],10,10)
      }
    });
    addFooters(doc)
    doc.save(`Stock in the shop as at ${generationDate}.pdf`);
  }
  }

  export function depletedStock(stock_data,columns_data){
    // this should show stocks that are zero
  }