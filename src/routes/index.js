const { Router } = require('express');
const router = Router();
const getPokemonById = require('../controllers/getPokemonById.js');
const getAllTypes = require('../controllers/getalltypes.js');
const deletePokemon = require('../controllers/deletePokemon.js');
const getPokemonHandler = require('../controllers/getpokemonhandler.js')
const createPokemon = require('../controllers/createpokemon.js');
const modifyPokemon = require('../controllers/modifyPokemon.js');


router.get("/pokemon/:id", getPokemonById);

//Tengo dos controladores que deben ejecutarse en /pokemon, así que uso un controlador, podría usar el (next()) pero preferí hacerlo de esa manera
router.get("/pokemon", getPokemonHandler);

router.get("/types", getAllTypes);

router.options("/modify", (req, res,) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});
router.put("/modify", modifyPokemon);

//tenia un problema para acceder desde el cliente al server en estas rutas especificas, con esto lo solucione
router.options("/delete/:id", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});
router.delete("/delete/:id", deletePokemon);

router.options("/pokemon", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
  });
router.post("/pokemon", createPokemon);
//este .all es para que me mande un error especifico si utilizo cualquier otra ruta no declarada
router.all('*', (req, res) => {
    res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});


module.exports = router;
