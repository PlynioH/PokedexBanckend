const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Pokemon = require('../models/pokemon')

const validaPokemon = [
    check('nome','O nome do Pokemon é obrigatório').not().isEmpty(),
    check('tipo','O tipo do Pokemon é obrigatório').not().isEmpty(),
    check('_id','O _id do Pokemon é obrigatório').not().isEmpty(),
    check('hp','A vida do Pokemon é obrigatória').not().isEmpty(),
    check('foto','A foto do Pokemon é obrigatória').not().isEmpty()
]

router.get('/', async(req, res) => {
    try{
        const pokemons = await Pokemon.find()
        if(!pokemon){
            res.status(500).send({errors: [{message: 'Não foi possível encontrar Pokemons :('}]})
        }
        res.json(pokemons)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível encontrar Pokemons :('}]
        })
    }
})

router.get('/:id', async(req, res) => {
    try{
        const pokemon = await Pokemon.findById(req.params.id)
        if(!pokemon){
            res.status(500).send({errors: [{message: `Não foi possível obter o Pokemon com o _id informado ${req.params.id}`}]})
        }
        res.json(pokemon)
    } catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o Pokemon com o _id informado ${req.params.id}`}]
        })
    }
})

router.get('/tipo/:tipo', async(req, res) => {
    try{
        const pokemon = await Pokemon.find({"tipo": req.params.tipo})
        if(!pokemon){
            res.status(500).send({errors: [{message: `Não foi possível obter os Pokemons com o tipo informado ${req.params.tipo}`}]})
        }
        res.json(pokemon)
    } catch(err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter os Pokemons com o tipo informado ${req.params.tipo}`}]
        })
    }
})

router.get('/nome/:nome', async(req, res) => {
    try{
        const pokemon = await Pokemon.find({"nome": req.params.nome})
        if(!pokemon){
            res.status(500).send({errors: [{message: `Não foi possível obter o Pokemon com o nome informado ${req.params.nome}`}]})
        }
        res.json(pokemon)
    } catch(err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o Pokemon com o nome informado ${req.params.nome}`}]
        })
    }
})

router.post('/', validaPokemon,
   async(req, res) => {
       const errors = validationResult(req)
       if(!errors.isEmpty()){
           return res.status(400).json(({
               errors: errors.array()
           }))
       }
    try{
       let pokemon = new Pokemon(req.body)
       await pokemon.save()
       res.send(pokemon)
    }catch (err){
      return res.status(500).json({
          errors: [{message: `Erro ao salvar o Pokemon: ${err.message}`}]
      })
    }
})


 router.put('/', validaPokemon,
 async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
     }
  try{
      let dados = req.body
      await Pokemon.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
      .then(Pokemon => {
          res.send({message: `O pokemon ${Pokemon.nome} foi alterado com sucesso`})
      })
      .catch(err => {
          return res.status(500).send({message: `Erro ao alterar o Pokemon com o Código ${req.body._id}`})
      })
  }catch (err){
    return res.status(500).json({
        errors: [{message: `Erro ao alterar o Pokemon: ${err.message}`}]
    })
  }
})


router.delete('/:id', async(req, res) => {
    await Pokemon.findByIdAndRemove(req.params.id) 
    .then(pokemon => {
        res.send({message: `O Pokemon ${pokemon.nome} foi removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: `Não foi possível excluir o Pokemon com o id digitado ${req.params.id}`}]
        })
    })
})

module.exports = router
