# http://www.antepedia.com/Detail/p/pacparser.html

import sys
import getopt
import pacparser

inputfile = 'build/pac/oak/proxy.pac';
print 'Input file is', inputfile
pacparser.init()
pacparser.parse_pac(inputfile)
proxy = pacparser.find_proxy('https://pacollegeplan.collegeboard.org', 'pacollegeplan.collegeboard.org')
print('pacollegeplan.collegeboard.org:' + proxy)
proxy = pacparser.find_proxy('https://bigfuture.collegeboard.org', 'bigfuture.collegeboard.org')
print('bigfuture.collegeboard.org:' + proxy)
pacparser.cleanup()
