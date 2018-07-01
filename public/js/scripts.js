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

  fetchPalettes();
};

const fetchPalettes = async () => {
  const url = '/api/v1/palettes';
  const response = await (fetch(url));
  const palettes = await response.json();

  await palettes.forEach(palette =>
    appendPalette(palette)
  )
}

const appendPalette = palette => {
  $(`.the-projects-${palette.project_id}`).append(`
    <div class="palette-projects">
      <span class="saved-palette-title">${palette.name}</span>
      <div class="saved-palette-colors" style="background-color: ${palette['color1']};"}></div>
      <div class="saved-palette-colors" style="background-color: ${palette['color2']};"}></div>
      <div class="saved-palette-colors" style="background-color: ${palette['color3']};"}></div>
      <div class="saved-palette-colors" style="background-color: ${palette['color4']};"}></div>
      <div class="saved-palette-colors" style="background-color: ${palette['color5']};"}></div>
      <button class="delete-saved-palette palette-${palette.id}"></button>
    </div>
  `)
}

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