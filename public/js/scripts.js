const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

const generatePalette = () => {
  $('.color-card').each(function() {
    const generatedColor = generateRandomColor();
    const isLocked = $(this).children()[1].classList[1] === 'locked';

    if (!isLocked) {
      $(this).children()[0].innerText = generatedColor;
      $(this).css({ 'background-color': generatedColor });
    }
  });
};

function toggleLock() {
  $(this).children()[1].classList[1] !== 'locked'
    ? $(this).children()[1].classList.add('locked')
    : $(this).children()[1].classList.remove('locked');
}

$('.generate-palette').on('click', generatePalette);
$('.color-card').on('click', toggleLock);
$('.save-palette-button').on('click', addPalette);
$('.save-project-button').on('click', addProject);
$('.split-projects').on('click', '.delete-saved-palette', deletePalette);

generatePalette();