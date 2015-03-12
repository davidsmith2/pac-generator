#
#
class my_apache {
	class { 'apache': }
	$host_ip = '10.0.2.2'
	$host_port = '3000'
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
				url				=> "http://${host_ip}:${host_port}/",
				reverse_urls 	=> ["http://${host_ip}:${host_port}/"],
			}
		]
	}
}
