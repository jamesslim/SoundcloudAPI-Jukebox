/*
 * @param id is SoundCloud assigned id
 * @param title is Song's title
 */
function Song( id, title ) {
  this.id = id;
  this.title = title;
}
function Jukebox(){
  // the following arrays are parallel
  this.songs = []; // our Song object
  this.players = []; // the SoundCloud player object
  this.currentSong = 0;
  this.SC = SC;
  this.SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });
  }
// add a song to the jukebox
Jukebox.prototype.addSong = function(){
  // Array.prototype.push.apply(this.songs,arguments );
  for( let i=0; i<arguments.length; i++){
    this.songs.push( arguments[i] );
  }
}
// play the player for the current track
Jukebox.prototype.play = function(){
  console.log( "in play", this );
  const self = this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  // see if we already have a player for
  // the current song...  if so, use that
  if( player ) {
    console.log( "player detected" );
    player.play();
    // to do: update the player song info
  } else {
    console.log( "no player detected" );
  // else, go and fetch a player, then play
    this.SC.stream('/tracks/'+song.id).then(function(p){
      console.log( "got player", p);
      self.players[self.currentSong] = p;
      console.log( self.players );
      self.play();
    });
  }
  document.querySelector('h4').innerText = this.songs[this.currentSong].title;
}
// pause the player for the current track
Jukebox.prototype.pause = function(){
  // to do: implement
  this.players[this.currentSong].pause();
}
// stop the player for current track
Jukebox.prototype.stop = function(){
  // to do: ...
  let player = this.players[this.currentSong];
  player.seek(0);
  this.players[this.currentSong].pause();
}
// advance to next song
Jukebox.prototype.next = function(){
  // do too: ...
  let player = this.players[this.currentSong];
  this.currentSong += 1;
  if(this.currentSong >= this.songs.length){
    this.currentSong = 0;
  }
  player.seek(0);
  this.play();
}
// go back one song
Jukebox.prototype.back = function(){
  // to do: ..
  let player = this.players[this.currentSong];
  if(this.currentSong >= 1) {
  this.currentSong = this.currentSong - 1;
  }
  else {
    this.currentSong = (this.songs.length - 1);
  }
  player.seek(0);
  this.play();
}

var myJukebox = new Jukebox();
myJukebox.addSong(new Song('336791060', "Villa - Limo Tint"), new Song('288943612',"The Well Tempered - Turn"), new Song('273828810',"21 Savage - X"), new Song('207301134',"Lefti - Castle"));

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.play').addEventListener('click',function(event){
    myJukebox.play();
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('play').style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.pause').addEventListener('click',function(event){
    myJukebox.pause();
    document.getElementById('play').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.stop').addEventListener('click',function(event){
    myJukebox.stop();
    document.getElementById('play').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.next').addEventListener('click',function(event){
    myJukebox.next();
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('play').style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.back').addEventListener('click',function(event){
    myJukebox.back();
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('play').style.display = "none";
  });
});