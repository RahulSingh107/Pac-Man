//This javascript code is beginner friendly and Easy to read and understand
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// inner width is a window object provided by the browser window
canvas.width = innerWidth;
canvas.height = innerHeight;
// now we are going to set  one boundary for the game map this is only one block boundary and we need multiple of them

//#region
/* Class Section
 */
// <--------Boundary class------->
class Boundary {
  // static property for the height and width i.e. 40
  static width = 40;
  static height = 40;
  // properties to add the boundary
  constructor({
    position
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }
  // creating a draw fuction to see the drawn boundary
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// <------player class ( to create pacman)------>
class Player {
  constructor({
    position,
    velocity
  }) {
    // setting the properties of the player
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  // drawing the pacman (blueprint )
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    //The startAngle and endAngle parameters define the start and end points of the arc in radians
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

//#endregion
/*CLASS SECTION ENDS HERE
 */

// we can create multiple boundraies by using multiple boundary function like below but it is very inefficient and time taking
// const boundary=new Boundary({
//     position:{
//         x:0,
//         y:0
//     }
// })
// boundary.draw()
// const boundary2=new Boundary({
//     position:{
//         x:41,
//         y:0
//     }
// })
// boundary2.draw()

// Effiecient way to do the same would be this

// Creating boundaries object array to store all the positions of the boundary DYNAMICALLY
const boundaries = [];

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
let lastKey = '';

// The given code uses the map variable, which is  an array of arrays (a 2D array), to iterate through its elements and create new Boundary objects when the symbol variable equals the string '-'. This is done using the forEach method, which is an array method that allows you to iterate through each element of an array.
// creating a refrence map array with the nested array const map[[]]
const map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
  //here the '-' are representing the boxes and the ' '(space) is represnting the space in the map
];
// BASIC STRUCTURE OF A CALLBACK FUNCTION---> callback_fun(=>({ }))
map.forEach((row, i) => {
  //i is for index value for the current row
  row.forEach((symbol, j) => {
    //j is the index for the symbol
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.height * j,
              y: Boundary.width * i,
            },
          })
        );
        break;
    }
  });
}); //traditional method would have taken 100 lines of code but we did it in 20
//calling the draw function

// <-------------------calling the functions from the different classes----->
// boundaries
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  boundaries.forEach((boundary) => {
    boundary.draw();
    // Adding the collision detection equation to the player(pac man) i.e.  the player won't go outside the map zone at any given point
    if (player.position.y - player.radius +player.velocity.y <= boundary.position.y + boundary.height
      && player.position.x + player.radius + player.velocity.x >= boundary.position.x 
      && player.position.y+player.radius +player.velocity.y >=boundary.position.y
       && player.position.x-player.radius +player.velocity.x<=boundary.position.x+boundary.width)
       {
    //  console.log('we are coliding'); To see if the detection is true
    player.velocity.x=0;
    player.velocity.y=0;
  
   }
  
  });

  // player(pacman)
  player.update();
  // player.velocity.y = 0;
  // player.velocity.x = 0;

  if (keys.w.pressed && lastKey === 'w') {
    player.velocity.y = -5
  } else if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 5
  } else if (keys.s.pressed && lastKey === 's') {
    player.velocity.y = 5
  }
}
animate();

//#region  Adding the event listeners for the movement
addEventListener("keydown", ({
  key
}) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
 
});
addEventListener("keyup", ({
  key
}) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }

});
//#endregion