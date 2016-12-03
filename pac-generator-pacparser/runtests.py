# http://www.antepedia.com/Detail/p/pacparser.html

import sys
import getopt
import pacparser

def main():
	inputfile = 'proxy.pac';
	print('Input file is', inputfile)
	pacparser.init()
	pacparser.parse_pac(inputfile)
	proxy = pacparser.find_proxy('http://localhost', 'localhost')
	print('localhost:' + proxy)
	proxy = pacparser.find_proxy('http://www.yahoo.com', 'www.yahoo.com')
	print('www.yahoo.com:' + proxy)
	pacparser.cleanup()

if __name__ == '__main__':
	main()