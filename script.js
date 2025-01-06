document.addEventListener('DOMContentLoaded', function() {
  
  const introText = document.querySelector('.intro-text');
  const container = document.querySelector('.container');
  const toggleCheckbox = document.getElementById('theme-toggle-checkbox');
  const texts = [
    "Hi!",
    "Who am I?",
    "My name is Muhammad Ali.", 
    "My age is fifteen",
    "What can I do?", 
    "I can make software", 
    "I can make games", 
    "I can make computer generated imagery", 
    "Where can you check my stuff?", 
    "Click on any of the links below!", 
    "Where can you drop suggestions?", 
    "Email me at alimad.co.ltd@gmail.com", 
    "Or contact me over discord."
  ];
  let currentIndex = 0;
  function toggleNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  // Initial text
  introText.textContent = texts[currentIndex];

  // Load theme preference from localStorage
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleCheckbox.checked = true;
  }

  window.toggleTheme = function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  
  // Change text with manual transform on container click
  document.getElementById('bgCanvas').addEventListener('click', () => {
    onKlick();
  });
  container.addEventListener('click', () => {
    onKlick();
  });
  function onKlick(){
    document.getElementById("welcomeText").style.opacity = '0';
    introText.style.opacity = '0';
    introText.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      introText.textContent = texts[currentIndex];
      introText.style.transform = 'translateY(20px)';
      introText.style.opacity = '0';

      setTimeout(() => {
        introText.style.opacity = '1';
        introText.style.transform = 'translateY(0)';
      }, 50);
    }, 500);
  }

  // Setup canvas for random shapes
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  resizeCanvas();

  // Random Shape Class
  class RandomShape {
    constructor(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 50 + 20; // Size between 20 and 70
      this.color = `hsla(${Math.random() * 360}, 70%, 50%, 0.7)`; // Random color
      this.speedX = Math.random() * 2 - 1; // Random speed in X direction
      this.speedY = Math.random() * 2 - 1; // Random speed in Y direction
      this.shapeType = ['circle', 'rectangle', 'polygon'][Math.floor(Math.random() * 3)];
    }

    move() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      if (this.shapeType == 'circle') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shapeType == 'rectangle') {
        ctx.fillRect(this.x, this.y, this.size, this.size / 2);
      } else if (this.shapeType == 'polygon') {
        ctx.beginPath();
        ctx.moveTo(this.x + this.size / 2, this.y);
        for (let i = 1; i < 6; i++) {
          ctx.lineTo(this.x + this.size / 2 * Math.cos(i * 2 * Math.PI / 6), this.y + this.size / 2 * Math.sin(i * 2 * Math.PI / 6));
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  let shapes = [];
  for (let i = 0; i < 50; i++) {
    shapes.push(new RandomShape(canvas.width, canvas.height));
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);

  function animateShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
      shape.move();
      shape.draw(ctx);
    });
    requestAnimationFrame(animateShapes);
  }

  animateShapes();
  
});
function toggleNav() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
