
// For dummy data
let id = 0;
function createData(country, co) {
  id += 1;
  return { id, country, co };
}

// Call a function that fetches correct data from a world bank api
exports.list_all_emissions = function(req, res) {

    const dummy = [
        createData('Finland', 123),
        createData('Sweden', 237),
        createData('USA', 262),
        createData('Canada', 305),
        createData('Russia', 356),
    ];
    
    res.json(dummy)
}