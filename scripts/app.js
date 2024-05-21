const name1 = prompt('Введите ваше имя')
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result( name1 + "многому нужно научиться", 0),
	new Result( name1 + "неплохо разбираетесь", 2),
	new Result("Что за лев " + name1 + " Главное практика. Вопросов будет больше с каждым днем", 4),
];

//Массив с вопросами
const questions = 
[
	new Question(" Дядя Посланника Аллаха(ﷺ) , неверный и противодействующим Пророку", 
	[
		new Answer("Абу Хамза", 0),
		new Answer("Абдуль-Мутталиб", 0),
		new Answer("Абу Талиб", 0),
		new Answer("Абу Лахаб", 1)
	]),

	new Question("Как звали отца Посланника Аллаха(ﷺ)", 
	[
		new Answer("Абдуллах", 1),
		new Answer("Мукаввим", 0),
		new Answer(" Харис", 0),
		new Answer("Зубейр", 0)
	]),

	new Question("Как звали маму Посланника Аллаха(ﷺ)", 
	[
		new Answer("Фатима", 0),
		new Answer("Амина", 1),
		new Answer("Сумая", 0),
		new Answer("Хадиджа", 0)
	]),

	new Question("На каком месяце беременности Амины умер Абдуллах", 
	[
		new Answer("2", 1),
		new Answer("5", 0),
		new Answer("9", 0),
		new Answer("7", 0)
	]),

	new Question("Что произошло после рождения Посланника Аллаха(ﷺ)", 
	[
		new Answer("с большим и ужасным грохотом раскололся дворец Хосроя", 0),
		new Answer(" обрушились  четырнадцать арок (шурфа) дворца Хосроя", 0),
		new Answer("погасли огни персов", 0),
		new Answer("Цари ослабли и оказались не в состоянии заговорить", 0),
		new Answer("Все перечисленное", 1),
	]),

	new Question("В какой день недели родился Посланник Аллаха(ﷺ)", 
	[
		new Answer("Пятница", 0),
		new Answer("Четверг", 0),
		new Answer("Среда", 0),
		new Answer("Понедельник", 1)
	]),

	new Question("В какой день родился Посланник Аллаха(ﷺ)", 
	[
		new Answer("10 раби аль-аваль", 0),
		new Answer("12 раби аль-аваль", 1),
		new Answer("27 рамадан", 0),
		new Answer("20 рамадан", 0)
	]),

	new Question(" Кто назвал Пророка именем «Мухаммад»(ﷺ)?", 
	[
		new Answer("Абу Талиб", 0),
		new Answer("Абу Ляхаб", 0),
		new Answer("Абдуль-Мутталиб", 1),
		new Answer("Абдуллах", 0)
	]),

	new Question("Как звали кормилицу Пророка (ﷺ)", 
	[
		new Answer("Амина", 0),
		new Answer("Сумая", 0),
		new Answer("Халима", 1),
		new Answer("Зайнаб", 0)
	]),

	new Question(" На сколько за день вырастал Пророк (ﷺ) в отличии от других детей", 
	[
		new Answer("На месяц", 1),
		new Answer("На неделю", 0),
		new Answer("На 2 недели", 0),
		new Answer("На год", 0)
	]),

	new Question("Когда Пророк (ﷺ) встал на ноги?", 
	[
		new Answer("В месяц", 0),
		new Answer("В 3 месяца", 1),
		new Answer(" В 2 месяца", 0),
		new Answer("В год", 0)
	]),

	new Question("Когда Пророк (ﷺ) начал ходить?", 
	[
		new Answer("В 3 месяца", 0),
		new Answer("В 5 месяцев", 1),
		new Answer("В 4 месяца", 0),
		new Answer("В 8 месяцев", 0)
	]),

	new Question("Когда Пророк (ﷺ) начал разговаривать?", 
	[
		new Answer("6 месяцев", 0),
		new Answer("в 2 года", 0),
		new Answer("В 9 месяцев", 1),
		new Answer("В 1,5 года", 0)
	]),

	new Question("Сколько ангелов расклеили грудь Пророка (ﷺ)", 
	[
		new Answer("7", 0),
		new Answer("2", 1),
		new Answer("11", 0),
		new Answer("1", 0)
	]),

	new Question("Чем ангелы заполнили сердце пророка (ﷺ)", 
	[
		new Answer("Светом", 1),
		new Answer("Иманом", 0),
		new Answer("Добром", 0),
		new Answer("Щедростью", 0)
	]),

	new Question("Сколько лоет было пророку (ﷺ), когда кормилица вернула его маме?", 
	[
		new Answer("6", 0),
		new Answer("2", 0),
		new Answer("4", 1),
		new Answer("3,5", 0)
	]),

	new Question("Где нашли Пророка (ﷺ), когда Халима потеряла его (ﷺ)?", 
	[
		new Answer("У каабы", 0),
		new Answer("Дома у Амины", 0),
		new Answer("В долине Тихама", 1),
		new Answer("местность аль-Абва", 0)
	]),

	new Question("Где скончалась мать Пророка(ﷺ) Амина ", 
	[
		new Answer("В мекке", 0),
		new Answer("В местности аль-Абва", 1),
		new Answer("В долине Тихама", 0),
		new Answer("В долине Тихама", 0),
		new Answer("В медине", 0)
	]),

	new Question("Сколько лет было Пророку (ﷺ), когда умерла его мать?", 
	[
		new Answer("9", 0),
		new Answer("8", 0),
		new Answer("6", 1),
		new Answer("4", 0)
	]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 2000);
}