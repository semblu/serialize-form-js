window.serializeForm = function(form) {
	if (!form || !(form instanceof HTMLElement) || form.nodeName !== 'FORM') {
		console.error('Form element is missing or is not "FORM" HTMLElement!');
		return false;
	}
	var paramsObj = {};
	for(var i = 0; i < form.elements.length; i++) {
		var element = form.elements[i];
		if(element.name === '' || element.disabled) {
			continue;
		}
		
		var testNode = element;
		while(testNode.nodeName !== 'FORM' && (testNode.nodeName !== 'FIELDSET' || !testNode.disabled)){
			testNode = testNode.parentNode;
		}
		if(testNode.disabled){
			continue;
		}
		
		switch(element.nodeName) {
			case 'INPUT':
				switch(element.type) {
					case 'checkbox':
					case 'radio':
						if(element.checked) {
							if(element.name in paramsObj){
								paramsObj[element.name] += ',' + encodeURIComponent(element.value);
							}
							else{
								paramsObj[element.name] = encodeURIComponent(element.value);
							}
						}						
						break;
					default:
						if(element.name in paramsObj){
							paramsObj[element.name] += ',' + encodeURIComponent(element.value);
						}
						else{
							paramsObj[element.name] = encodeURIComponent(element.value);
						}
						break;
				}
				break;
			case 'SELECT':
				for (var j = 0; j < element.options.length; j++) {
					if (element.options[j].selected) {
						if(element.name in paramsObj){
							paramsObj[element.name] += ',' + encodeURIComponent(element.options[j].value);
						}
						else{
							paramsObj[element.name] = encodeURIComponent(element.options[j].value);
						}
					}
				}
				break;
			default:
				if(element.name in paramsObj){
					paramsObj[element.name] += ',' + encodeURIComponent(element.value);
				}
				else{
					paramsObj[element.name] = encodeURIComponent(element.value);
				}
				break;
		}
	}
	var pairs = [];
	for(key in paramsObj){
		pairs.push(key + '=' + paramsObj[key]);
	}
	return pairs.join('&');
}
