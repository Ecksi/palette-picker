exports.seed = function (knex, Promise) {
  return knex("palettes").del()
    .then(() => knex("projects").del())
    .then(() => {
      return Promise.all([
        knex("projects").insert({
          name: "Almost out",
        })
          .then(project => {
            return knex("palettes").insert(
              [{
                name: "not winter",
                color1: "#CFDEE7",
                color2: "#92B4F4",
                color3: "#5E7CE2",
                color4: "#4472CA",
                color5: "#0A369D",
                project_id: project[4],
              },
              {
                name: "never summer",
                color1: "#26CC12",
                color2: "#99AA34",
                color3: "#827912",
                color4: "#78F11A",
                color5: "#3AAA2B",
                project_id: project[1],
              }
              ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
