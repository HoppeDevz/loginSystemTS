import express from 'express'
import cors from 'cors'
import routes from './routes'
import handlebars from 'express-handlebars'

class App {
    public express: express.Application

    constructor () {
      this.express = express()

      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      this.express.engine('handlebars', handlebars({ defaultLayout: 'main' }))
      this.express.set('view engine', 'handlebars')
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express
