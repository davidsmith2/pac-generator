function FindProxyForURL(url, host) {
	var proxy = 'www.google.com:80';
	var exceptions = [];
	var rules = ['localhost'];
	for (var i = 0; i < exceptions.length; i++) {
		if (dnsDomainIs(host, exceptions[i])) {
			return 'DIRECT';
		}
	}
	for (var j = 0; j < rules.length; j++) {
		if (dnsDomainIs(host, rules[j])) {
			return 'PROXY ' + proxy;
		}
	}
	return 'DIRECT';
}