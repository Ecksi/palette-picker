exports.seed = function(knex, Promise) {
  return knex("palettes").del()
    .then(() => knex("projects").del())
    .then(() => {
      return Promise.all([
        knex("projects").insert({
          name: "Almost out",
        })
        .then(project => {
          return knex("palettes").insert({
            color1: "#CFDEE7",
            color2: "#92B4F4",
            color3: "#5E7CE2",
            color4: "#4472CA",
            color5: "#0A369D",
          })
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
