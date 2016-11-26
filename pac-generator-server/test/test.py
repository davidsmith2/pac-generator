# http://www.antepedia.com/Detail/p/pacparser.html

import sys
import getopt
import pacparser

inputfile = '../dist/pac/3998124c-7e7f-48d8-933f-7d4ebbdbe999/5839f9e75010aea10088c2b3/proxy.pac';
print 'Input file is', inputfile
pacparser.init()
pacparser.parse_pac(inputfile)
proxy = pacparser.find_proxy('http://localhost', 'localhost')
print('localhost:' + proxy)
pacparser.cleanup()
