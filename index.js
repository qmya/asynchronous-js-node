const fs = require('fs');
const superagent = require('superagent');
//__dirname : ./
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  //   superagent
  //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
  //     .end((err, res) => {
  //       if (err) return console.log(err.message);
  //       console.log(res.body.message);
  //       //this will create a new file and add the image of the dog to it
  //       fs.writeFile('dog-img.txt', res.body.message, (err) => {
  //         if (err) return console.log(err.message);
  //         console.log('Random dog image saved to the file');
  //       });
  //     });
  // });

  //using the Promises 👇🏽 to change the ☝🏽 code from callback hell
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((result) => {
      console.log(result.body.message);
      //this will create a new file and add the image of the dog to it
      fs.writeFile('dog-img.txt', result.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to the file');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
