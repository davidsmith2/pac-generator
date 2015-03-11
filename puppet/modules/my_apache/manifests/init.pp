#
#
class my_apache {
	class { 'apache': }
	apache::mod { 'rewrite': }
	apache::mod { 'vhost_alias': }
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
				path	=> '/',
				url		=> 'http://10.0.2.2:3000',
			}
		]
	}
}
