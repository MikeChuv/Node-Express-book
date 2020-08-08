const express = require('express')

const app = express()

const handlebars = require('express-handlebars').create({
	defaultLayout : 'main',
	extname : 'hbs'
})


const fortunes = [
	"Победи свои страхи или они победят тебя",
	"Рекам нужны истоки",
	"Не бойся неведомого",
	"Будь проще, и люди на тебе подтянутся"
]


app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')


app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/about', (req, res) => {
	let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
	res.render('about', {fortune : randomFortune})
})


// Обобщенный обработчик 404 (промежуточное ПО)
app.use((req, res, next) => {
	res.status(404)
	res.render('404')
})


app.use((err, req, res, next) => {
	console.log(err.stack)
	res.status(500)
	res.render('500')
})


app.listen(app.get('port'), () => {
	console.log('Express запущен на http://localhost:' + app.get('port') + '...')
})

