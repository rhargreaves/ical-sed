
function UiViewModel() {
	self = this;
	self.source = ko.observable("foo");
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
}

ko.applyBindings(new UiViewModel());
