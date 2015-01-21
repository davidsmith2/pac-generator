var getHosts = function (arrIn) {
    var arrOut = [];
    for (var i = 0; i < arrIn.length; i++) {
        arrOut.push(arrIn[i].host);
    }
    return "'" + arrOut.join("','") + "'";
};

module.exports = function (proxy) {
    var server = proxy.name.toLowerCase() + 'proxy:'  + proxy.port;
    var exceptions = getHosts(proxy.exceptions);
    var rules = getHosts(proxy.rules);
    var output = '';
    output += "function FindProxyForURL(url, host) {\n";
    output += "\tvar proxy = '" + server + "';\n";
    output += "\tvar exceptions = [" + exceptions + "];\n";
    output += "\tvar rules = [" + rules + "];\n";
    output += "\tfor (var i = 0; i < exceptions.length; i++) {\n";
    output += "\t\tif (dnsDomainIs(host, exceptions[i])) {\n";
    output += "\t\t\treturn 'DIRECT';\n";
    output += "\t\t}\n";
    output += "\t}\n";
    output += "\tfor (var j = 0; j < rules.length; j++) {\n";
    output += "\t\tif (dnsDomainIs(host, rules[j])) {\n";
    output += "\t\t\treturn 'PROXY ' + proxy;\n";
    output += "\t\t}\n";
    output += "\t}\n";
    output += "\treturn 'DIRECT';\n";
    output += "}";
    return output;
};
