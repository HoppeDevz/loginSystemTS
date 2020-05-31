import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.allUsers)
routes.post('/users/createAccount', UserController.createUser)
routes.post('/users/tryLogin', UserController.tryLogin)
routes.post('/users/sendTokenForgotPassword', UserController.sendTokenforgotPassword)
routes.post('/users/resetPassword', UserController.changePasswordWithToken)

routes.get('/loginScreen', UserController.loginScreen)

export default routes
