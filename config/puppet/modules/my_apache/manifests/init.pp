#
#
class my_apache {
	class { 'apache': }
	apache::vhost { 'pac.collegeboard.org':
		port 		=> '80',
		docroot 	=> '/vagrant/build',
		directories => [
			{
				path 			=> '/vagrant/build',
				options 		=> ['Indexes', 'FollowSymLinks', 'MultiViews'],
				allow_override 	=> 'all',
				order 			=> 'allow,deny',
				allow 			=> 'from all',
			}
		],
		proxy_pass	=> [
			{
				path			=> '/',
				url				=> 'http://localhost:3000/',
				reverse_urls 	=> ['http://localhost:3000/'],
			}
		]
	}
}
