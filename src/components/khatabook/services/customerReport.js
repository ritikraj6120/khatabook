import jsPDF from "jspdf";
import "jspdf-autotable";


// define a generatePDF function that accepts a customers argument
const generatePDF = customers => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Title", "Name", "You'll Get","You'll Give"];
  // define an empty array of rows
  const tableRows = [];

  // for each customer pass all its data into an array
  for (let i = 0; i < customers.length; i++) {
	const customerData = [];
	customerData.push(customers[i].title);
	customerData.push(customers[i].name);
	if(customers[i].lendamount-customers[i].takeamount>=0)
	{
		customerData.push(customers[i].lendamount-customers[i].takeamount);
	}
	else{
		customerData.push(0);
	}
	if(customers[i].takeamount-customers[i].lendamount>0)
	{
		customerData.push(customers[i].takeamount-customers[i].lendamount);
	}
	else{
		customerData.push(0);
	}


//   customers.forEach(customer => { 
//     const customerData = [
//       customer.title,
//       customer.name,
//       customer.lendamount,
// 	  customer.takeamount
//     ];
    // push each tickcet's info into a row
    tableRows.push(customerData);
};


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr =  date[1] +"_"+ date[2] +"_"+ date[3] ;
  // customer title. and margin-top + margin-left
  doc.text("Customers who have taken money from you", 14, 15);
  // we define the name of our PDF file.
  doc.save(`Customer_report_${dateStr}.pdf`);
};

export default generatePDF;