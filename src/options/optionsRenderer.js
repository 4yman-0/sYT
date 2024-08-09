function getLocalized(key) {
	const browser = chrome || browser;
	return browser.i18n.getMessage(key) || key;
}

function renderCategories(data) {
    let fragment = document.createDocumentFragment();
    for (category in data){
        const categoryElement = document.createElement('section');
        categoryElement.classList.add('category');
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = getLocalized(category);
        categoryHeader.classList.add('category__header');
        categoryElement.append(
            categoryHeader,
            renderSections(data[category])
        );
        fragment.append(categoryElement);
    };
    document.getElementById('main').append(fragment);
}

function renderSections(category) {
    let sectionsList = document.createElement('ul');
    for (section in category){
        let sectionElement = document.createElement('li');
        sectionElement.classList.add('section');
        const sectionHeader = document.createElement('h2');
        sectionHeader.textContent = getLocalized(section);
        sectionHeader.classList.add('section__header');
        sectionElement.append(
            sectionHeader,
            renderOptions(category[section])
        );
        sectionsList.append(sectionElement);
    }
    return sectionsList;
}

function renderOptions(section) {
    let optionsList = document.createElement('ul');
    for (option in section){
        optionsList.append(renderOption(option, section[option]));
    }
    return optionsList;
}

function renderOption(name, option) {
    let optionElement = document.createElement('li');
    optionElement.classList.add('option');

	let optionInput = document.createElement('input');
    optionInput.classList.add('option__input');

    switch (option.type) {
    case 'checkbox':
        optionInput.type = option.type;
        optionInput.checked = option.state;
        optionInput.addEventListener('change', () => {
            option.state = optionInput.checked;
            setStorage(name, option.state);
        });
        break;
	case 'select':
		optionInput = document.createElement('select');
	    optionInput.classList.add('option__input');
		option.options.forEach(choice => {
			let element = document.createElement('option');
			element.value = choice;
			element.textContent = getLocalized(choice);
			optionInput.append(element);
		});
	    optionInput.addEventListener('change', () => {
			option.state = optionInput.value;
	        setStorage(name, option.state);
	    });
	    break;
	case 'select-multiple':
		optionInput = document.createElement('select');
	    optionInput.classList.add('option__input');
		optionInput.multiple = true;
		option.options.forEach(choice => {
			let element = document.createElement('option');
			element.value = choice;
			element.textContent = getLocalized(choice);
			optionInput.append(element);
		});
	    optionInput.addEventListener('change', () => {
			option.state = optionInput.selectedOptions.map(opt => opt.value);
	        setStorage(name, option.state);
	    });
	    break;
    default:
        throw 'Unknown option type';
    }

    const optionLabel = document.createElement('label');
    optionLabel.classList.add('option__label');
    optionLabel.textContent = getLocalized(name);
	optionElement.append(optionLabel, optionInput);
    return optionElement;
}
