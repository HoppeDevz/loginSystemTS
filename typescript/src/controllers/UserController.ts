import { Request, Response } from 'express'
import mysql from 'mysql'
import Mail from '../services/mail'
import crypto from 'crypto'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'typescript'
})

class UserController {
  public async allUsers (req: Request, res: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (fields) { }// read fields
        if (error) throw error && reject(error)
        if (results) {
          res.status(200).send(results)
          resolve(results)
        }
      })
    })
  }

  public async createUser (req: Request, res: Response): Promise<Response> {
    return new Promise(() => {
      const { username, name, lastname, email, password } = req.body
      connection.query(`SELECT * FROM users WHERE username = "${username}"`, (error, results, fields) => {
        if (fields) { }// read fields
        if (error) { throw error } else {
          if (results) {
            if (results.length > 0) {
              return res.status(200).send({ createdAccount: false, reason: 'Username already exist' })
            } else {
              connection.query(`SELECT * FROM users WHERE email = "${email}"`, function (error, results, fields) {
                if (error) { throw error }
                if (fields) { }// read fields
                if (results.length > 0) {
                  return res.status(200).send({ createdAccount: false, reason: 'Email already exist' })
                } else {
                  const userToken = crypto.randomBytes(4).toString('hex')
                  console.log(userToken)
                  connection.query(`INSERT INTO users (username,password,name,lastname,email,user_token) VALUES (
                  "${username}",
                  "${password}",
                  "${name}",
                  "${lastname}",
                  "${email}",
                  "${userToken}"
                  )`, (error, results, fields) => {
                    if (results && fields) { }// read results and fields
                    if (error) { throw error } else {
                      return res.status(200).send({ createdAccount: true })
                    }
                  })
                }
              })
            }
          }
        }
      })
    })
  }

  public async tryLogin (req: Request, res: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      const { username, password } = req.body
      connection.query(`SELECT * FROM users WHERE username = "${username}"`, (error, results, fields) => {
        if (fields) { }// read fields
        if (error) { throw error && reject(error) } else {
          if (results.length > 0) {
            if (results[0].password === password) {
              res.status(200).send({ login: true, username, password })
            } else {
              res.status(200).send({ login: false, reason: 'Incorrect Password', username, password })
            }
          } else {
            res.status(200).send({ login: false, reason: 'Incorrect Password', username, password })
          }
        }
      })
    })
  }

  public async loginScreen (req: Request, res: Response): Promise<Response> {
    return new Promise(() => {
      res.render('login')
    })
  }

  public async sendTokenforgotPassword (req: Request, res: Response): Promise<Response> {
    return new Promise(() => {
      const { email } = req.body
      connection.query(`SELECT * FROM users WHERE email = "${email}"`, function (error, results, fields) {
        if (error) { throw error }
        if (fields) { }// read fields
        if (results.length > 0) {
          //  sendemail
          const token = results[0].user_token
          Mail.to = req.body.email
          Mail.subject = 'Recuperação de Senha'
          Mail.message = `Aqui está o link para você redefinir sua senha do HoppeMedia: http://localhost:3000/ResetPassword/${token}`
          Mail.sendMail()
          return res.status(200).send({ sendMail: true })
        } else {
          return res.status(200).send({ sendMail: false, reason: "This email doesn't exist" })
        }
      })
    })
  }

  public async changePasswordWithToken (req: Request, res: Response): Promise<Response> {
    return new Promise(() => {
      const { token, newPassword } = req.body
      connection.query(`SELECT * FROM users WHERE user_token = "${token}"`, function (error, results, fields) {
        if (error) { throw error }
        if (fields) { }// read fields
        if (results.length > 0) {
          connection.query(`UPDATE users SET password = "${newPassword}" WHERE user_token = "${token}"`)
          res.status(200).send({ changedPassword: true })
        } else {
          res.status(200).send({ changedPassword: false, reason: "This token doesn't valid" })
        }
      })
    })
  }
}

export default new UserController()
