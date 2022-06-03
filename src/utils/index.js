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


    let total = sales_data.reduce((sum, el) => sum + el.total, 0);
    let totals = [{content: `Total = ${total.toLocaleString()}`, colSpan: 4, styles:{halign:'center'}}]

    let new_data = [...sales_data.map(el => [
      el.item.toUpperCase(), 
      el.units_sold, 
      el.unit_price, 
      el.total.toLocaleString()]), totals]

  
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
        doc.setFont('courier', 'bold');
        doc.setFontSize("12");
        doc.setTextColor(52,147,223);
        doc.setFillColor(255, 255, 255);
      }
    };
   
    const company = "CUTE EVE LIMITED";
    const reportHeading = generationDate +"  sales for  " + screen_name.toUpperCase();

  
    let doc = new jsPDF()
    
    autoTable(doc, {
      body: new_data,
      columns: column_data,
      margin: { top:30, horizontal: 10 },
      headStyles: {fillColor: [0,150,214], fontStyle: 'bold'},
      bodyStyles: {fontSize:8,font:'courier',fontStyle:'bold'},
      theme: "grid",
      showHead: "everyPage",
      willDrawCell: drawCell,
      
      didDrawPage: function (data) {
      //Document Header
      doc.setFontSize(10);
      doc.setFont('courier', 'bold')
      doc.text([String(company), String(reportHeading)],10,10)
      }
    });
    addFooters(doc)
    doc.save("Total sales for"+'_'+screen_name+'_'+generationDate+'.pdf')
  }
  export function salesPerPerson(sales_data, columns_data,name, start_date, end_date){
    // everything sold by a particular person
    // on a particular date
  }

  export function salesReportByDate(sales_data,columns_data,start_date, end_date){
    // generate all sales by date
    // so basically it will show sales between two different
    // dates
  }

  export function stockInShop(stock_data,columns_data){
    // this should show all stock in shop and the total value
  }

  export function depletedStock(stock_data,columns_data){
    // this should show stocks that are zero
  }