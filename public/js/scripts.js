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

const addProject = async () => {
  event.preventDefault();
  const projectName = $('.save-project-input').val();
  const url = '/api/v1/projects';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projects: { name: projectName } }),
  }

  const response = await fetch(url, options);
  const projectId = await response.json();

  addProjectOptions(projectName, projectId.id)
  $('.save-project-input').val('');
}

const addPalette = () => {
  event.preventDefault();
  const paletteName = $('.save-palette-input').val();
  const url = '/api/v1/palettes';
  const paletteBody = {
    palette: {
      name: paletteName,
      color1: $('.color-value')[0].innerText,
      color2: $('.color-value')[1].innerText,
      color3: $('.color-value')[2].innerText,
      color4: $('.color-value')[3].innerText,
      color5: $('.color-value')[4].innerText,
      project_id: $('.palette-dropdown option:selected').val()
    }
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paletteBody),
  }

  fetch(url, options);
  $('.save-palette-input').val('');

  appendPalette(paletteBody.palette);
}

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