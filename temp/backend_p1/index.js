const express = require('express')

const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]


// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World !</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note);
    }
    else {
        response.status(404).send('This note doesnt exist').end()
    }
})


// console.log(notes);
// console.log(JSON.stringify(notes));

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let id = 0;
    if (notes.length == 0) {
        id = 0;
    }
    else {
        id = Math.max(...notes.map(note => note.id));
    }

    return String(id + 1);
}

app.post('/api/notes', (request, response) => {
    let body = request.body
    if (!body.content) {
        return response.status(400).json({ error: 'Note must have content' });
    }
    // console.log(note)
    // response.json(note)
    const newNote = {
        content: body.content,
        id: generateId(),
        important: body.important || false
    }

    notes = notes.concat(newNote);
    response.status(201).json(newNote);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})