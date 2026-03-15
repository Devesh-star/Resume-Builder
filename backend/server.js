import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import userRouter from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import { connectDB } from './config/db.js'

import { fileURLToPath } from 'url'
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const app = express()
const PORT = 4000

app.use(cors())

connectDB()

app.use(express.json())

app.use('/api/auth', userRouter)
app.use('/api/resume', resumeRoutes)

app.use('/uploads', 
    express.static(path.join(process.cwd(), 'uploads'), {
        setHeaders: (res, req) => {
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        }
    })
)

app.get('/', (req, res) => {
    res.send("Server is running") 
})

/* ✅ ADD THIS SECTION */

app.use(express.static(path.join(process.cwd(), 'frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'frontend/dist/index.html'))
})

/* -------------------- */

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})