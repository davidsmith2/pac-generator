module.exports = function (proxy, exceptions, rules) {
    var str = '';
    str += "function FindProxyForURL(url, host) {\n";
    str += "\tvar proxy = '" + proxy.server + ":" + proxy.port + "';\n";
    str += "\tvar exceptions = [" + exceptions + "];\n";
    str += "\tvar rules = [" + rules + "];\n";
    str += "\tfor (var i = 0; i < exceptions.length; i++) {\n";
    str += "\t\tif (dnsDomainIs(host, exceptions[i])) {\n";
    str += "\t\t\treturn 'DIRECT';\n";
    str += "\t\t}\n";
    str += "\t}\n";
    str += "\tfor (var j = 0; j < rules.length; j++) {\n";
    str += "\t\tif (dnsDomainIs(host, rules[j])) {\n";
    str += "\t\t\treturn 'PROXY ' + proxy;\n";
    str += "\t\t}\n";
    str += "\t}\n";
    str += "\treturn 'DIRECT';\n";
    str += "}";
    return str;
};
