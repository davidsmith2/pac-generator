var exceptions = [
    '.nmd.collegeboard.org',
    'cbtwitterfeeds.collegeboard.org',
    'dev.sat.collegeboard.org',
    'dev.tools.collegeboard.com',
    'mango.collegeboard.org',
    'netconnect.collegeboard.org',
    'pac.collegeboard.org',
    'pacollegeplan.collegeboard.org',
    'regionalforums.collegeboard.org',
    'secure-media.collegeboard.org',
    'secure-ppmedia.collegeboard.org',
    'vcm.collegeboard.com',
    'vcm2.collegeboard.com',
    'www.collegeboard.org'
];
var rules = [
    '.collegeboard.org',
    '.collegeboard.com'
];
var proxies = [
    {
        name: 'Apple',
        port: 3128,
        exceptions: exceptions,
        rules: rules
    },
    {
        name: 'Beech',
        port: 3128,
        exceptions: exceptions,
        rules: rules
    },
    {
        name: 'Oak',
        port: 3128,
        exceptions: exceptions,
        rules: rules
    },
    {
        name: 'Palm',
        port: 3128,
        exceptions: exceptions,
        rules: rules
    },
    {
        name: 'Pine',
        port: 3128,
        exceptions: exceptions,
        rules: rules
    }
];
module.exports = proxies;