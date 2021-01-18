const fs = require('fs');
const superagent = require('superagent');
//Pro is Promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    //herewe do readfilework / Async work
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file 😢');
      resolve('success');
    });
  });
};

//Using Promises with Async/ Await
//async automaticatically return promises
//inside Async ftn we will have 1 or more await expression
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const result = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(result.body.message);
    await writeFilePro('dog-img.txt', result.body.message);
    console.log('Random dog image saved to the file');
  } catch (err) {
    console.log(err.message);
  }
};

getDogPic();
//Using Promises
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((result) => {
//     console.log(result.body.message);
//     //this will create a new file and add the image of the dog to it

//     return writeFilePro('dog-img.txt', result.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to the file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//__dirname : ./
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

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
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((result) => {
//       console.log(result.body.message);
//       //this will create a new file and add the image of the dog to it
//       fs.writeFile('dog-img.txt', result.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to the file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
