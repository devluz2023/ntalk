const app = require('./app'); // Your main express app file

const port = process.env.PORT || 30001;

app.listen(port, () => {
  console.log(`Ntalk is running on port ${port}`);
});
