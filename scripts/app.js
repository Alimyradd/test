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

	new Question("Сколько лет было пророку (ﷺ), когда кормилица вернула его маме?", 
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
		new Answer("В медине", 0)
	]),

	new Question("Сколько лет было Пророку (ﷺ), когда умерла его мать?", 
	[
		new Answer("9", 0),
		new Answer("8", 0),
		new Answer("6", 1),
		new Answer("4", 0)
	]),

	new Question("Что посоветовал мазать монах, чтобы вылечились глаза Пророка (ﷺ)", 
	[
		new Answer("Землю", 0),
		new Answer("Молоко", 0),
		new Answer("Зам-зам", 0),
		new Answer("Слюну", 1)
	]),

	new Question("Сколько лет было Пророку (ﷺ) когда скончался Абдуль-Мутталиб?", 
	[
		new Answer("9", 0),
		new Answer("8", 1),
		new Answer("7", 0),
		new Answer("10", 0)
	]),

	new Question("Под чью опеку перешел пророк(ﷺ) по завещанию Абдуль-Мутталиба?", 
	[
		new Answer("Абу-Талиба", 1),
		new Answer("Хамзы", 0),
		new Answer("Абу-Ляхаба", 0),
		new Answer("Абдуллаха", 0)
	]),

	new Question("Во сколько лет Мухаммад(ﷺ) отправился в шам с Абу-Талибом?", 
	[
		new Answer("12", 1),
		new Answer("11", 0),
		new Answer("14", 0),
		new Answer("16", 0)
	]),

	new Question("Как звали монаха, который назвал Мухаммада(ﷺ) ГОСПОДИНОМ МИРОВ", 
	[
		new Answer("Яхья", 0),
		new Answer("Муфаса", 0),
		new Answer("Бахира", 1),
		new Answer("Шрам", 0)
	]),

	new Question("Во сколько лет Мухаммад(ﷺ) отправился в Шам 2 раз", 
	[
		new Answer("22", 0),
		new Answer("23", 0),
		new Answer("25", 1),
		new Answer("27", 0)
	]),

	new Question("Как звали попутчика Пророка(ﷺ)", 
	[
		new Answer("Майсара", 1),
		new Answer("Никар", 0),
		new Answer("Муфи", 0),
		new Answer("Зейд", 0)
	]),

	new Question("Пророк (ﷺ) остановился под деревом и монах сказал-Под этим деревом не останавливался никто, кроме пророка. Как звали монаха?", 
	[
		new Answer("Мафир", 0),
		new Answer("Кабир", 0),
		new Answer("Леик", 0),
		new Answer("Нестур", 1)
	]),

	new Question("Какой дядя засватал Хадиджу Пророку(ﷺ)?", 
	[
		new Answer("Абу-Талиб", 0),
		new Answer("Хамза", 1),
		new Answer("Абу-Ляхаб", 0),
		new Answer("Харис", 0)
	]),

	new Question("Сколько лет было Пророку (ﷺ) когда отстраивали Каабу?", 
	[
		new Answer("27", 0),
		new Answer("29", 0),
		new Answer("30", 0),
		new Answer("35", 1)
	]),

	new Question("Какой был первый глас, обращенный к Пророку(ﷺ)?", 
	[
		new Answer("Читай", 0),
		new Answer("Избегай лицемеров", 0),
		new Answer("Укрой свой аврат", 1),
		new Answer("Не гони просящего", 0)
	]),

	new Question("Кто первым зашел через врата рода Шайба для разрешения спора?", 
	[
		new Answer("Хамза", 0),
		new Answer("Абу бакр", 0),
		new Answer("Мухаммад(ﷺ)", 1),
		new Answer("Умар", 0)
	]),

	new Question("Сколько раз Пророк (ﷺ) собирался совершить недостойные Пророка деяния?", 
	[
		new Answer("0", 0),
		new Answer("2", 1),
		new Answer("4", 0),
		new Answer("5", 0)
	]),

	new Question("Как звали пещеру, в которой уеденялся Пророк(ﷺ)?", 
	[
		new Answer("Сира", 0),
		new Answer("Шам", 0),
		new Answer("Хира", 1),
		new Answer("Нак", 0)
	]),

	new Question("На сколько лет прекратились Откровения после первых аятов?", 
	[
		new Answer("3", 1),
		new Answer("5", 0),
		new Answer("1,5", 0),
		new Answer("2", 0)
	]),

	new Question("Кто первым из мужчин уверовал в Пророка(ﷺ)?", 
	[
		new Answer("Хамза", 0),
		new Answer("Усман", 0),
		new Answer("Абу Бакр", 1),
		new Answer("Саад", 0)
	]),

	new Question("Кто первым уверовала из женщин?", 
	[
		new Answer("Сумая", 0),
		new Answer("Аиша", 0),
		new Answer("Умм Кульсум", 0),
		new Answer("Хадиджа", 1)
	]),

	new Question("Кто из детей первым уверовал?", 
	[
		new Answer("Али", 1),
		new Answer("Усман", 0),
		new Answer("Ибрагим", 0),
		new Answer("Иса", 0)
	]),

	new Question("Через сколько лет после призыва, Пророк (ﷺ) велел мусульманам разойтись по странам?", 
	[
		new Answer("4", 0),
		new Answer("5", 1),
		new Answer("6", 0),
		new Answer("3,5", 0)
	]),

	new Question("Куда велел им направиться Пророк (ﷺ)", 
	[
		new Answer("Ясриб", 0),
		new Answer("Дамаск", 0),
		new Answer("Эфиопию", 1),
		new Answer("Константинополь", 0)
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
