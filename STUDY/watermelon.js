var name;
var size;
var quantity;
onEvent('nameInput', 'change', function () {
	name = gettxt('nameInput');
	updateSuggestion();
});
onEvent('sizeSelector', 'change', function () {
	size = gettxt('sizeSelector');
	updateSuggestion();
});
onEvent('quantityInput', 'change', function () {
	quantity = getNumber('quantityInput');
	updateSuggestion();
});
onEvent('quantityDownBtn', 'click', function () {
	quantity = getNumber('quantityInput') || 0;
	quantity--;
	setNumber('quantityInput', quantity);
	updateSuggestion();
});
onEvent('quantityUpBtn', 'click', function () {
	quantity = getNumber('quantityInput') || 0;
	quantity++;
	setNumber('quantityInput', quantity);
	updateSuggestion();
});
function updateSuggestion() {
	if (!name || size == 'Select Size' || !quantity) {
		return;
	}
	var res = 'Hi ' + name + ', if you want ';
	res += quantity + ' ' + size + ' watermelons you should go to ';
	if (size == 'Small' || (size == 'Medium' && quantity < 4)) {
		res += "the United Farmer's market.";
	} else if (size == 'Medium' || (size == 'Large' && quantity < 3)) {
		res += "the local Sakhile's Spa fruit shore.";
	} else if (size == 'Large') {
		res += 'the FoodLovers grocery shop.';
	}
	settxt('sug', res);
}
