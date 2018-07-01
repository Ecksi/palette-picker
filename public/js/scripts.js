$('.generate-palette').click(() => generatePalette());
$('.color-card').click(function () {
  $(this).children()[1].classList[1] !== 'locked'
    ? $(this).children()[1].classList.add('locked')
    : $(this).children()[1].classList.remove('locked');
});
$('.save-palette-button').click(() => { savePalette();});
$('.save-project-button').click(() => {});
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

const savePalette = () => {};

generatePalette();