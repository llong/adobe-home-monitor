$(function(){


/********************
     Tile Prototype
*********************/
function tile(tileName,hasControls){

  // Get JSON data from 'server'
  this.data = new Object();
  var getData = function(){
      $.getJSON('./data.json')
      .done(function(json){
        data = json;
        $('#temperature').children('.text').text(data.temperature.current + '\u00b0');
        $('#temperature').children('.gauge').children('span').text('Desired Temp: '+ data.temperature.desired + '\u00b0');

        if(data[tileName].on){
          $('#'+tileName).attr('class','on');
        }
      });
  }

  // Load JSON data
  getData();

  // If controls paramater set to true add controls to tile
  if(hasControls){
    this.hasControls = hasControls;
  } else {
    this.hasControls = false;
  }



  // Toggle state on tile
  this.toggle = function(){
    if(data[tileName].on) {
      data[tileName].on = false;
      console.log(tileName + ' turned off');
      $('#'+tileName).attr('class','');
    } else {
      data[tileName].on = true;
      console.log(tileName + ' turned on');
      $('#'+tileName).attr('class','on');
    }
  }

  // Change gauge value for desired temperature & update tile text
    this.add = function(){
      data[tileName].desired += 1;
      $('.gauge > span').text('Desired Temp: '+ data.temperature.desired + '\u00b0');
      console.log(data[tileName].desired);

    };
    this.minus = function(){
      data[tileName].desired -= 1;
      $('.gauge > span').text('Desired Temp: '+ data.temperature.desired + '\u00b0');
      console.log(data[tileName].desired);
    };


  // Create tile HTML element
  var tile = '<div ' + 'id="' + tileName + '" >';
  if(hasControls){ // if Temperature tile add controls
    tile += '<div class="text"></div>';
    tile += '<div class="gauge"><span></span><br/>';
    tile += '<button class="minus">-</button> ';
    tile += '<button class="add">+</button></div>';
  } else {
    tile += '<div class="text">' + tileName + '</div>'
    tile += '</div>'
  }
  $('.tiles').append(tile);
}


// Add tiles to page
var lights = new tile('lights');
var curtains = new tile('curtains');
var temperature = new tile('temperature',true);


// Attach methods to tile click events
$('#lights').click(function(e){
  lights.toggle();
});

$('#curtains').click(function(){
  curtains.toggle();
});

$('#temperature').click(function(e){
    if($(e.target).is(':button')){
      if($(e.target).is('.add')){
        temperature.add();
      } else if ($(e.target).is('.minus')) {
        temperature.minus();
      } else {
        //
      }
    } else {
      temperature.toggle();
    }
});


});
