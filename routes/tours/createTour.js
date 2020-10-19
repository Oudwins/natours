const fs = require('fs');
const path = require('path');
const tours = require('../../preloads/tours');

module.exports = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  const newPath = path.join(
    __dirname,
    '..',
    '..',
    'dev-data',
    'data',
    'tours-simple.json'
  );
  fs.writeFile(newPath, JSON.stringify(tours), (err) => {
    if (err)
      return res.status(500).json({
        message: 'Could not add tour',
        err,
      });

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};
