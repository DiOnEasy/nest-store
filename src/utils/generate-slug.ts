export const generateSlug = (input: string): string => {
	// Создаем объект, который будет содержать маппинг русских букв на английские
	const russianToEnglishMap: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'kh',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya'
	}

	// Преобразуем входную строку в нижний регистр
	const lowercaseInput = input.toLowerCase()

	// Заменяем русские буквы на английские
	const transliteratedInput = lowercaseInput
		.split('')
		.map(char => russianToEnglishMap[char] || char)
		.join('')

	// Удаляем все символы, кроме букв, цифр и дефиса
	const slug = transliteratedInput.replace(/[^a-z0-9-]/g, '-')

	// Удаляем двойные дефисы
	return slug.replace(/--+/g, '-')
}
