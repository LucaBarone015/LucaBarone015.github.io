
//calls theme function when button is clicked
let btn = document.querySelector('#theme').addEventListener('click', theme)

//calls the setTheme function with the argument of current theme
function theme(){
  console.log("Theme works");
  const currentTheme = localStorage.getItem('userTheme') || 'light';
  setTheme(currentTheme);
}

//switches the theme based on the current theme passed into the fuction 
function setTheme(theme) {
  let inTheme = theme;
  if(inTheme == 'dark')
  {
    theme = 'light';
  }
  else{
    theme = 'dark';
  }
  //sets the local storage to the current theme
    localStorage.setItem('userTheme', theme);
    document.body.className = theme;
}


// Load saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    document.body.className = savedTheme;
});