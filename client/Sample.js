

if (Meteor.isClient) {
  // counter starts at 0

  var i = 1;
  Session.setDefault('counter', "");

  Template.schedule.helpers({
    counter: function () {
      return Session.get('counter');
    }

    
    
  });

  Template.export.events({
    'click .export-data' : function(event){


    

    




   } 
  }),

  Template.schedule.events({
  'focusout .focus' : function(event){
    var testing = event.target.value;

    console.log("This is the variable " + testing);
    if(testing == '7:00pm'){
    Session.set('counter', "3pm-11pm");
    }
    else if (testing == '8:00pm'){
    Session.set('counter', "4pm-12am");
    }
  else{
    Session.set('counter', "");

  }
  },

  'click #add' : function (event) {




        var currentTable = event.target.previousElementSibling;
    

      var table = document.getElementById("GameTable");
      // var clone = $("#GameTable tr:last").clone().find('input').val('').end().insertAfter("#GameTable tr:last")
      var clone = $("#GameTable tr:eq(1)").clone().find("input").each(function() {
    $(this).val('')
  }).end();

    clone.attr({

      'id': function(_, id) {return id + "extra"},
      'name' : function(_, name) {return name + "extra"},
      'class' : function(_,name) {return name + "extra"},
    })  
    clone.appendTo(currentTable);
  



      



    },

    "click #delete": function (event) {
       
  var element = event.target.parentNode.parentNode;
  console.log(element);
  element.remove();

 
  }
});

Template.BackWall.events({

'click #add' : function (event) {



      // var gamerow = document.getElementById("Game");
      var currentTable = event.target.previousElementSibling;
      console.log(currentTable);
      

      // var table = document.getElementById("GameTable");
      // var clone = $("#GameTable tr:last").clone().find('input').val('').end().insertAfter("#GameTable tr:last")
      var clone = $("#GameTable2 tr:eq(1)").clone().find("input").each(function() {
    $(this).val('').attr('id', function(_, id) { return id + i });
  }).end().appendTo(currentTable);
  i++;
      // clone.id = "Game2"

      // table.appendChild(clone)

      

      console.log(i);



    },

"click #delete": function (event) {
       
  var element = event.target.parentNode.parentNode;
  console.log(element);
  element.remove();

}


  });


Template.Admins.events({

'click #add' : function (event) {



      // var gamerow = document.getElementById("Game");
      var currentTable = event.target.previousElementSibling;
      console.log(currentTable);
      

      // var table = document.getElementById("GameTable");
      // var clone = $("#GameTable tr:last").clone().find('input').val('').end().insertAfter("#GameTable tr:last")
      var clone = $("#GameTable3 tr:eq(1)").clone().find("input").each(function() {
    $(this).val('').attr('id', function(_, id) { return id + i });
  }).end().appendTo(currentTable);
  i++;
      // clone.id = "Game2"

      // table.appendChild(clone)

      
      console.log(i);



    },

"click #delete": function (event) {
       
  var element = event.target.parentNode.parentNode;
  console.log(element);
  element.remove();

}


  });

Template.upload.onCreated( () => {

  Template.instance().uploading = new ReactiveVar(false);

});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true, 
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
            console.log(results.data);
          }
        });
      }
    });
  },

  'click #save' : function (event) {

    event.preventDefault();
    Meteor.call('clearCollection');
     var mondayGames = [];
      var tuesdayGames = [];
      var wedGames = [];
      var thursGames = [];
      var friGames = [];
      var satGames = [];
      var sunGames = [];


    var testingthestring = ["monday", "tuesday","wednesday", "thursday", "friday","saturday","sunday"];

   var weeklyGames = [mondayGames, tuesdayGames, wedGames, thursGames, friGames, satGames, sunGames];
      console.log(weeklyGames);
       // console.log(tuesdayGames);
//////////////////////
    for (var itemTop = 0; itemTop <weeklyGames.length; itemTop++){
      var gamearray = weeklyGames[itemTop];
      var correctDayTable1 = $("." +testingthestring[itemTop] +"Table .GameTable tr");

      var correctDayTable2 = $("." +testingthestring[itemTop] +"Table .GameTable2 tr");

      var correctDayTable3 = $("." +testingthestring[itemTop] +"Table .GameTable3 tr");
      console.log(correctDayTable1);
      console.log("below this line is table2")
      console.log(correctDayTable2);
      console.log("below this line is table3")
      console.log(correctDayTable3);
      



    var myTable = [];
$(correctDayTable1).each(function (i, tr) {
    var myTr = [];

    $('td', this).each(function() {
        myTr.push($(this).find(":input").val());
    });

    myTable.push(myTr);
});

console.log(myTable);
Xcel.insert(myTable);



var myTable2 = [];
$(correctDayTable2).each(function (i, tr) {
    var myTr2 = [];

    $('td', this).each(function() {
        myTr2.push($(this).find(":input").val());
    });

    myTable2.push(myTr2);
});

console.log(myTable2);


var myTable3 = [];
$(correctDayTable3).each(function (i, tr) {
    var myTr3 = [];

    $('td', this).each(function() {
        myTr3.push($(this).find(":input").val());
    });

    myTable3.push(myTr3);
});

console.log(myTable3);
Bert.alert( 'Schedule Saved!', 'success', 'growl-top-right' );
};

// Meteor.call('msexcelbuilder');
Meteor.call('excel4node');





  },

  'click #loadLastSave' : function (event){

    



    var mondayInfo = [];
    var tuesdayInfo = [];
    var wednesdayInfo = [];
    var thursdayInfo = [];
    var fridayInfo = [];
    var saturdayInfo = [];
    var sundayInfo = [];


    var savedGame = Xcel.find().fetch();
    console.log(savedGame);

    for (var item = 0; item <savedGame.length; item++){
      var currentObject = savedGame[item];
      console.log(currentObject);

        console.log(currentObject[item].length);

        var lengthofObject = _.size(currentObject) - 1;
        for (var newItem = 0; newItem < lengthofObject; newItem++){

          console.log(currentObject[newItem]);
          if ( item == 0){
            mondayInfo.push(currentObject[newItem])
}
          if ( item == 1){
            tuesdayInfo.push(currentObject[newItem])
}
          if ( item == 2){
            wednesdayInfo.push(currentObject[newItem])
}

          if ( item == 3){
            thursdayInfo.push(currentObject[newItem])
}
          if ( item == 4){
            fridayInfo.push(currentObject[newItem])
}
          if ( item == 5){
            saturdayInfo.push(currentObject[newItem])
}

          if ( item == 6){
            sundayInfo.push(currentObject[newItem])
}

        }


        // for (var nextItem = 0; nextItem < currentObject[item].length; nextItem++){

        //   var nextCurrentObject = (currentObject[item])[nextItem];
        //   // console.log(nextCurrentObject);
        // }

        console.log(mondayInfo);
        console.log(tuesdayInfo);
        console.log(wednesdayInfo);
        console.log(thursdayInfo);
        console.log(fridayInfo);
        console.log(saturdayInfo);
        console.log(sundayInfo);

        var weeklyGamesInfo = [mondayInfo, tuesdayInfo, wednesdayInfo,thursdayInfo, fridayInfo,saturdayInfo,sundayInfo]
        console.log(weeklyGamesInfo);

     
    };

    var testingthestring = ["monday", "tuesday","wednesday", "thursday", "friday","saturday","sunday"];

    for (var itemTop = 0; itemTop <weeklyGamesInfo.length; itemTop++){

      var gamearray = weeklyGamesInfo[itemTop];
      gamearray.splice(0,2);
      console.log(gamearray);
     
      var correctDayTable = $("." +testingthestring[itemTop] +"Table .GameTable")
      // console.log(correctDayTable);

    $("." +testingthestring[itemTop] +"Table .GameTable tr:not(:eq(0), :eq(1))").remove();

    for (var itemZ = 0; itemZ <gamearray.length; itemZ++){
      console.log(gamearray[itemZ]);
      console.log("-----")

      var clone = $("#GameTable tr:eq(1)").clone().find("input").each(function() {
    $(this).val('')
  }).end();

    clone.attr({

      'id': function(_, id) {return id + itemZ},
      'name' : function(_, name) {return name + itemZ},
      'class' : function(_,name) {return name + itemZ},
    })  
    clone.appendTo(correctDayTable);


    var rowID = "Game" + itemZ;
        // console.log(rowID);
        console.log("----------------------")

  

        var currentMondayObject = mondayInfo[itemZ];
        var currentTuesdayObject = tuesdayInfo[itemZ];
        var currentWednesdayObject = wednesdayInfo[itemZ];
        var currentThursdayObject = thursdayInfo[itemZ];
        var currentFridayObject = fridayInfo[itemZ];
        var currentSaturdayObject = saturdayInfo[itemZ];
        var currentSundayObject = sundayInfo[itemZ];


        for (var object in currentMondayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".monday").find("#" + rowID).find(".away").val(currentMondayObject[object]);
        }
          
          else if(object == 2){
            $(".monday").find("#" + rowID).find(".home").val(currentMondayObject[object]);
          }

          else if(object == 3){
            $(".monday").find("#" + rowID).find(".umpire").val(currentMondayObject[object]);
          }

          else if(object == 0){
            $(".monday").find("#" + rowID).find(".startTime").val(currentMondayObject[object]);
          }
          else if(object == 4){
            $(".monday").find("#" + rowID).find(".tech").val(currentMondayObject[object]);
          }
          else if(object == 5){
            $(".monday").find("#" + rowID).find(".shift").val(currentMondayObject[object]);
          }
          else if(object == 6){
            $(".monday").find("#" + rowID).find(".station").val(currentMondayObject[object]);
          }
}
        for (var object in currentTuesdayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".tuesday").find("#" + rowID).find(".away").val(currentTuesdayObject[object]);
        }
          
          else if(object == 2){
            $(".tuesday").find("#" + rowID).find(".home").val(currentTuesdayObject[object]);
          }

          else if(object == 3){
            $(".tuesday").find("#" + rowID).find(".umpire").val(currentTuesdayObject[object]);
          }

          else if(object == 0){
            $(".tuesday").find("#" + rowID).find(".startTime").val(currentTuesdayObject[object]);
          }
          else if(object == 4){
            $(".tuesday").find("#" + rowID).find(".tech").val(currentTuesdayObject[object]);
          }
          else if(object == 5){
            $(".tuesday").find("#" + rowID).find(".shift").val(currentTuesdayObject[object]);
          }
          else if(object == 6){
            $(".tuesday").find("#" + rowID).find(".station").val(currentTuesdayObject[object]);
          }
}
        for (var object in currentWednesdayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".wednesday").find("#" + rowID).find(".away").val(currentWednesdayObject[object]);
        }
          
          else if(object == 2){
            $(".wednesday").find("#" + rowID).find(".home").val(currentWednesdayObject[object]);
          }

          else if(object == 3){
            $(".wednesday").find("#" + rowID).find(".umpire").val(currentWednesdayObject[object]);
          }

          else if(object == 0){
            $(".wednesday").find("#" + rowID).find(".startTime").val(currentWednesdayObject[object]);
          }
          else if(object == 4){
            $(".wednesday").find("#" + rowID).find(".tech").val(currentWednesdayObject[object]);
          }
          else if(object == 5){
            $(".wednesday").find("#" + rowID).find(".shift").val(currentWednesdayObject[object]);
          }
          else if(object == 6){
            $(".wednesday").find("#" + rowID).find(".station").val(currentWednesdayObject[object]);
          }
}

        for (var object in currentThursdayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".thursday").find("#" + rowID).find(".away").val(currentThursdayObject[object]);
        }
          
          else if(object == 2){
            $(".thursday").find("#" + rowID).find(".home").val(currentThursdayObject[object]);
          }

          else if(object == 3){
            $(".thursday").find("#" + rowID).find(".umpire").val(currentThursdayObject[object]);
          }

          else if(object == 0){
            $(".thursday").find("#" + rowID).find(".startTime").val(currentThursdayObject[object]);
          }
          else if(object == 4){
            $(".thursday").find("#" + rowID).find(".tech").val(currentThursdayObject[object]);
          }
          else if(object == 5){
            $(".thursday").find("#" + rowID).find(".shift").val(currentThursdayObject[object]);
          }
          else if(object == 6){
            $(".thursday").find("#" + rowID).find(".station").val(currentThursdayObject[object]);
          }
}

        for (var object in currentFridayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".friday").find("#" + rowID).find(".away").val(currentFridayObject[object]);
        }
          
          else if(object == 2){
            $(".friday").find("#" + rowID).find(".home").val(currentFridayObject[object]);
          }

          else if(object == 3){
            $(".friday").find("#" + rowID).find(".umpire").val(currentFridayObject[object]);
          }

          else if(object == 0){
            $(".friday").find("#" + rowID).find(".startTime").val(currentFridayObject[object]);
          }
          else if(object == 4){
            $(".friday").find("#" + rowID).find(".tech").val(currentFridayObject[object]);
          }
          else if(object == 5){
            $(".friday").find("#" + rowID).find(".shift").val(currentFridayObject[object]);
          }
          else if(object == 6){
            $(".friday").find("#" + rowID).find(".station").val(currentFridayObject[object]);
          }
}
        for (var object in currentSaturdayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".saturday").find("#" + rowID).find(".away").val(currentSaturdayObject[object]);
        }
          
          else if(object == 2){
            $(".saturday").find("#" + rowID).find(".home").val(currentSaturdayObject[object]);
          }

          else if(object == 3){
            $(".saturday").find("#" + rowID).find(".umpire").val(currentSaturdayObject[object]);
          }

          else if(object == 0){
            $(".saturday").find("#" + rowID).find(".startTime").val(currentSaturdayObject[object]);
          }
          else if(object == 4){
            $(".saturday").find("#" + rowID).find(".tech").val(currentSaturdayObject[object]);
          }
          else if(object == 5){
            $(".saturday").find("#" + rowID).find(".shift").val(currentSaturdayObject[object]);
          }
          else if(object == 6){
            $(".saturday").find("#" + rowID).find(".station").val(currentSaturdayObject[object]);
          }
}

        for (var object in currentSundayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object == 1){

          $(".sunday").find("#" + rowID).find(".away").val(currentSundayObject[object]);
        }
          
          else if(object == 2){
            $(".sunday").find("#" + rowID).find(".home").val(currentSundayObject[object]);
          }

          else if(object == 3){
            $(".sunday").find("#" + rowID).find(".umpire").val(currentSundayObject[object]);
          }

          else if(object == 0){
            $(".sunday").find("#" + rowID).find(".startTime").val(currentSundayObject[object]);
          }
          else if(object == 4){
            $(".sunday").find("#" + rowID).find(".tech").val(currentSundayObject[object]);
          }
          else if(object == 5){
            $(".sunday").find("#" + rowID).find(".shift").val(currentSundayObject[object]);
          }
          else if(object == 6){
            $(".sunday").find("#" + rowID).find(".station").val(currentSundayObject[object]);
          }
}




    }
    console.log("#############")



    ///////


    


  }



  },

  'click #add' : function (event) {


      var weekGames = Sales.find().fetch();
      var mondayGames = [];
      var tuesdayGames = [];
      var wedGames = [];
      var thursGames = [];
      var friGames = [];
      var satGames = [];
      var sunGames = [];
      var testingthestring = ["monday", "tuesday","wednesday", "thursday", "friday","saturday","sunday"];


      


    
      // console.log(weekGames);
      
      for (var item = 0; item <weekGames.length; item++){
        var currentObject = weekGames[item];
        
        // console.log(currentObject);
        for(var index in currentObject){
          // if (currentObject.hasOwnProperty(index)){
          //   console.log(index + ":    " + currentObject[index]);
              if(currentObject[index] ==="Mon."){
                // console.log(currentObject);
                mondayGames.push(currentObject);   
          } 
              else if(currentObject[index] ==="Tues."){
                tuesdayGames.push(currentObject);
              }

              else if(currentObject[index] ==="Wed."){
                wedGames.push(currentObject);
              }

               else if(currentObject[index] ==="Thurs."){
                thursGames.push(currentObject);
              }

              else if(currentObject[index] ==="Fri."){
                friGames.push(currentObject);
              }

              else if(currentObject[index] ==="Sat."){
                satGames.push(currentObject);
              }
              else if(currentObject[index] ==="Sun."){
                sunGames.push(currentObject);
              }
        } 
      }
      var weeklyGames = [mondayGames, tuesdayGames, wedGames, thursGames, friGames, satGames, sunGames];
      console.log(weeklyGames);
       // console.log(tuesdayGames);
//////////////////////
    for (var itemTop = 0; itemTop <weeklyGames.length; itemTop++){
      var gamearray = weeklyGames[itemTop];
      var correctDayTable = $("." +testingthestring[itemTop] +"Table .GameTable")
      console.log(correctDayTable);

      for (var item = 0; item<gamearray.length; item++){

        var currentTable = event.target.previousElementSibling;


      var table = document.getElementById("GameTable");
      // var clone = $("#GameTable tr:last").clone().find('input').val('').end().insertAfter("#GameTable tr:last")
      var clone = $("." +testingthestring[itemTop] +"Table .GameTable tr:eq(1)").clone().find("input").each(function() {
    $(this).val('')
  }).end();

    clone.attr({

      'id': function(_, id) {return id + item},
      'name' : function(_, name) {return name + item},
      'class' : function(_,name) {return name + item},
    })  
    clone.appendTo(correctDayTable);

    // $("." +testingthestring[itemTop] +"Table .GameTable tr:eq(1)").remove();

  


        var rowID = "Game" + item;
        // console.log(rowID);
        console.log("----------------------")

  

        var currentMondayObject = mondayGames[item];
        var currentTuesdayObject = tuesdayGames[item];
        var currentWednesdayObject = wedGames[item];
        var currentThursdayObject = thursGames[item];
        var currentFridayObject = friGames[item];
        var currentSaturdayObject = satGames[item];
        var currentSundayObject = sunGames[item];

        // console.log(currentMondayObject);

        for (var object in currentMondayObject){
          // console.log(object + ":    " + currentMondayObject[object]);
          if(object === "Visiting Team"){

          $(".monday").find("#" + rowID).find(".away").val(currentMondayObject[object]);
        }
          
          else if(object ==="Home Team"){
            $(".monday").find("#" + rowID).find(".home").val(currentMondayObject[object]);
          }

          else if(object ==="Replay Official"){
            $(".monday").find("#" + rowID).find(".umpire").val(currentMondayObject[object]);
          }

          else if(object ==="Time (EST)"){
            $(".monday").find("#" + rowID).find(".startTime").val(currentMondayObject[object]);
          }
}
        for (var object in currentTuesdayObject){
          // console.log(object + ":    " + currentTuesdayObject[object]);
          if(object === "Visiting Team"){

          $(".tuesday").find("#" + rowID).find(".away").val(currentTuesdayObject[object]);
        }
          
          else if(object ==="Home Team"){
            $(".tuesday").find("#" + rowID).find(".home").val(currentTuesdayObject[object]);
          }

          else if(object ==="Replay Official"){
            $(".tuesday").find("#" + rowID).find(".umpire").val(currentTuesdayObject[object]);
          }

          else if(object ==="Time (EST)"){
            $(".tuesday").find("#" + rowID).find(".startTime").val(currentTuesdayObject[object]);
          }
}

        for (var object in currentWednesdayObject){
          // console.log(object + ":    " + currentTuesdayObject[object]);
          if(object === "Visiting Team"){

          $(".wednesday").find("#" + rowID).find(".away").val(currentWednesdayObject[object]);
        }
          
          else if(object ==="Home Team"){
            $(".wednesday").find("#" + rowID).find(".home").val(currentWednesdayObject[object]);
          }

          else if(object ==="Replay Official"){
            $(".wednesday").find("#" + rowID).find(".umpire").val(currentWednesdayObject[object]);
          }

          else if(object ==="Time (EST)"){
            $(".wednesday").find("#" + rowID).find(".startTime").val(currentWednesdayObject[object]);
          }
}

        for (var object in currentThursdayObject){
          // console.log(object + ":    " + currentTuesdayObject[object]);
          if(object === "Visiting Team"){

          $(".thursday").find("#" + rowID).find(".away").val(currentThursdayObject[object]);
        }
          
          else if(object ==="Home Team"){
            $(".thursday").find("#" + rowID).find(".home").val(currentThursdayObject[object]);
          }

          else if(object ==="Replay Official"){
            $(".thursday").find("#" + rowID).find(".umpire").val(currentThursdayObject[object]);
          }

          else if(object ==="Time (EST)"){
            $(".thursday").find("#" + rowID).find(".startTime").val(currentThursdayObject[object]);
          }
}

        for (var object in currentFridayObject){
          // console.log(object + ":    " + currentTuesdayObject[object]);
          if(object === "Visiting Team"){

          $(".friday").find("#" + rowID).find(".away").val(currentFridayObject[object]);
        }
          
          else if(object ==="Home Team"){
            $(".friday").find("#" + rowID).find(".home").val(currentFridayObject[object]);
          }

          else if(object ==="Replay Official"){
            $(".friday").find("#" + rowID).find(".umpire").val(currentFridayObject[object]);
          }

          else if(object ==="Time (EST)"){
            $(".friday").find("#" + rowID).find(".startTime").val(currentFridayObject[object]);
          }
}

        for (var object in currentSaturdayObject){
                  // console.log(object + ":    " + currentTuesdayObject[object]);
                  if(object === "Visiting Team"){

                  $(".saturday").find("#" + rowID).find(".away").val(currentSaturdayObject[object]);
                }
                  
                  else if(object ==="Home Team"){
                    $(".saturday").find("#" + rowID).find(".home").val(currentSaturdayObject[object]);
                  }

                  else if(object ==="Replay Official"){
                    $(".saturday").find("#" + rowID).find(".umpire").val(currentSaturdayObject[object]);
                  }

                  else if(object ==="Time (EST)"){
                    $(".saturday").find("#" + rowID).find(".startTime").val(currentSaturdayObject[object]);
                  }
        }

          for (var object in currentSundayObject){
                    // console.log(object + ":    " + currentTuesdayObject[object]);
                    if(object === "Visiting Team"){

                    $(".sunday").find("#" + rowID).find(".away").val(currentSundayObject[object]);
                  }
                    
                    else if(object ==="Home Team"){
                      $(".sunday").find("#" + rowID).find(".home").val(currentSundayObject[object]);
                    }

                    else if(object ==="Replay Official"){
                      $(".sunday").find("#" + rowID).find(".umpire").val(currentSundayObject[object]);
                    }

                    else if(object ==="Time (EST)"){
                      $(".sunday").find("#" + rowID).find(".startTime").val(currentSundayObject[object]);
                    }
          }



      }

    }



     
      



    }
});




// Template.readCSV.events({
//   "click .btnReadCsv": function(event, template) {
//     console.log(template.find('#csv-file').files[0])
//       Papa.parse(template.find('#csv-file').files[0], {
//           header: true,
//           complete: function(results) {
//                _.each(results.data, function(csvData) {
//                    console.log(csvData.empId + ' , ' + csvData.empCode);
//                });
//           },
//           skipEmptyLines: true
//       });
//    } 
//  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // Xcel = new Mongo.Collection('xcel');
    // code to run on server at startu
  });
}
