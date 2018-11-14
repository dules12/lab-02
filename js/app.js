'use strict';
//DOG CONSTRUCTOR
function Creature(creature) {
  this.title = creature.title;
  this.image_url = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;
}
Creature.allCreatures = [];
//---------------------
//ADDING RENDER METHOD USING DOG.PROTOTYPE
Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>'); //APPENDS A DIV CLASS=CLONE TO MAIN (HTML TAG)
  let creatureClone = $('div[class="clone"]'); //HTML ELEMENT
  let creatureHtml = $('#photo-template').html(); //CONTENTS (INNERHTML) OF DOG-TEMPLATE\
  creatureClone.html(creatureHtml) //CONTENTS OF DOGCLONE IS NOW DOGHTML
  creatureClone.find('h2').text(this.title); //RETURNS FIRST H2 TAG AVAILABLE IN DOG-TEMPLATE CLASS AND SETS THE TEXT TO THIS.NAME
  creatureClone.find('img').attr('src', this.image_url); //RETURNS FIRST IMG TAG AVAILABLE IN DOG-TEMPLATE CLASS AND SETS THE TEXT TO THIS.NAME
  creatureClone.find('p').text(this.description);

  creatureClone.removeClass('clone'); //REMOVES #DOG-TEMPLATE CLASS
  creatureClone.attr('class', this.name); //SETTING DOGCLONE ATTR TO THIS.NAME
}
Creature.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Creature.allCreatures.push(new Creature(obj)); //PUSHES DOGS TO ALLDOGS[]
      })
    })
    .then(Creature.loadCreatures)
}
Creature.loadCreatures = () => { //CALLS THE RENDER FUNCTION FOR EACH DOG OBJ
  Creature.allCreatures.forEach(creature => creature.render())
}
$(() => Creature.readJson()); //CALLS READJSON