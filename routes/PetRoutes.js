const router = require('express').Router()

// Middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

// Controller
const PetController = require('../controllers/PetController')

// Routes
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePetBy)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)



module.exports = router