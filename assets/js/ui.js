
var clipboard = new Clipboard('.btn');

function UiViewModel() {
	self = this;
	self.source = ko.observable("");
	self.terms = ko.observableArray([ko.observable("")]);
	self.url =ko.computed(function() {
		var termsParam = self.terms().map(function(obj) {
			return encodeURIComponent(obj());
		}).join(',');
		var url = self.source();
		return newUrl = window.location.origin +
			"/ical?url=" +
			encodeURI(url) + "&containing=" + termsParam;

	});
	self.addTerm = function() {
		self.terms.push(ko.observable(""));
	};
	self.removeTerm = function(term) {
		return self.terms.remove(function(item) {
			return term == item();
		});
	};
	self.termKeyPress = function(data, event) {
		if (event.keyCode == 13) {
			self.addTerm();
			var termInputs = document.querySelectorAll('input.term');
			termInputs[termInputs.length-1].focus();
		} else {
			return true;
		}

	}
}

ko.applyBindings(new UiViewModel());
