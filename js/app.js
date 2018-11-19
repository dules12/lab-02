'use strict';
//Creature CONSTRUCTOR
function Creature(creature) {
  this.title = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
}
Creature.allCreatures = [];
//---------------------
//ADDING RENDER METHOD USING Creature.PROTOTYPE
Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>'); //APPENDS A DIV CLASS=CLONE TO MAIN (HTML TAG)
  let creatureClone = $('div[class="clone"]'); //HTML ELEMENT
  let creatureHtml = $('#photo-template').html(); //CONTENTS (INNERHTML) OF Photo-TEMPLATE\
  creatureClone.html(creatureHtml); //CONTENTS OF CreatureHTML IS NOW Creatureclone
  creatureClone.find('h2').text(this.title); //RETURNS FIRST H2 TAG AVAILABLE IN CLASS AND SETS THE TEXT TO THIS.NAME
  creatureClone.find('img').attr('src', this.image_url); //RETURNS FIRST IMG TAG AVAILABLE IN PHOTO-TEMPLATE CLASS AND SETS THE TEXT TO THIS.NAME
  creatureClone.find('p').text(this.description);
  creatureClone.removeClass('clone'); //REMOVES #PHTO-TEMPLATE CLASS
  creatureClone.attr('class', this.name); //SETTING CreatureClone ATTR TO THIS.NAME
}
// function dropDownMenu() {
//   let nonRepeatedArray = [];
//   Creature.allCreatures.forEach ((ele)=>{
//     if(!nonRepeatedArray.includes(ele.keyword)){
//       nonRepeatedArray.push(ele.keyword);
//     }
//   })
//   nonRepeatedArray.forEach ((ele)=>{
//     $('select').append(`<option value = "${ele}">${ele}</option>`)
//   })
// }
Creature.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Creature.allCreatures.push(new Creature(obj)); //PUSHES creatures TO allCreatures[]
      })
    })
    .then(Creature.loadCreatures)
    // .then(dropDownMenu)
}
Creature.loadCreatures = () => { //CALLS THE RENDER FUNCTION FOR EACH Creature OBJ
  Creature.allCreatures.forEach(creature => creature.render())
}
$(() => Creature.readJson()); //CALLS READJSON
