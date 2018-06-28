$('.generate-palette').click(() => generatePalette());
$('.lock-icon').click(function () {$(this).toggleClass('locked')});
$('.save-palette-button').click(() => {
  event.preventDefault();
  savePalette();
  console.log('save palette');
  // add each card to array save values to project object
});
$('.save-project-button').click(() => {
  event.preventDefault();
  console.log('save project');
  // add project w/ palette to endpoint(post)
});
$('.delete-saved-palette').click(() => console.log('delete button'));

const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

const generatePalette = () => {
  $(".color-card").each(function() {
    const generatedColor = generateRandomColor();
    const isLocked = $(this).children()[1].classList[1] === 'locked';
    
    if (!isLocked) {
      $(this).children()[0].innerText = generatedColor;
      $(this).css({ 'background-color': generatedColor });
    }
  });
};

const savePalette = () => {
  let newPalette = [];

  $(".color-card").each(function(card) { newPalette.push(this.innerText) });

  console.log(newPalette);
};

generatePalette();