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

const fetchProjects = async () => {
  const url = '/api/v1/projects';
  const response = await (fetch(url));
  const projects = await response.json();

  projects.forEach(({ name, id }) => {
    $('.split-projects').prepend(`
      <div class="the-projects-${id} the-projects-width">
        <hr>
        <button class="saved-project-name">${name}</button>
      </div>
    `)
    addProjectOptions(name, id);
  })
};

const addProjectOptions = (projectName, projectId) => {
  const project = `<option value=${projectId}>${projectName}</option>`

  $('.palette-dropdown').append(project);
};

$('.generate-palette').on('click', generatePalette);
$('.color-card').on('click', toggleLock);
$('.save-palette-button').on('click', addPalette);
$('.save-project-button').on('click', addProject);
$('.split-projects').on('click', '.delete-saved-palette', deletePalette);

generatePalette();
fetchProjects();