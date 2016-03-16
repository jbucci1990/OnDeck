
Meteor.methods({
  parseUpload( data ) {

    Sales.remove({});
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Sales.findOne( { saleId: item.saleId } );

      
        Sales.insert( item );

    }
  },
//Remove Collection 
  clearCollection(){
    Xcel.remove({});
    Xcel2.remove({});
    Xcel3 .remove({});



  },

  msexcelbuilder(){

    var excelbuilder = Meteor.npmRequire('msexcel-builder');
    var workbook = excelbuilder.createWorkbook('~/Desktop/', 'testing.xlsx');


      console.log('congratulations, your workbook created');
     
      var sheet1 = workbook.createSheet('sheet1', 2, 2);



      sheet1.set(1, 1, 'I am title');
      sheet1.width(1, 30);


    },

    excel4node(){

      var xl = Meteor.npmRequire('excel4node');
   
      // var Filesaver = Meteor.npmRequire('filesaver.js');


var wb = new xl.WorkBook();
var ws = wb.WorkSheet('My Worksheet');

var myStyle = wb.Style();

myStyle.Font.Size(14);
// myStyle.Fill.Pattern('solid');
myStyle.Fill.Color('FFFF0A')


var myCell = ws.Cell(1, 1);
myCell.String("Underline me please");

myCell.Style(myStyle);


wb.write('MyExcel.xlsx');


// console.log(wb);

    }



});