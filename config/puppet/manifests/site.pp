#
#
node default {
    File {
        owner   => 'root',
        group   => 'root',
        mode    => '0644',
    }
    Exec {
        path => [ '/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/' ],
    }
    exec { 'apt-get update':
        command => 'apt-get update',
    }
    package { 'gcc':
        ensure  => latest,
        require => Exec['apt-get update'],
    }
    package { 'make':
        ensure  => latest,
        require => Exec['apt-get update'],
    }
    package { 'build-essential':
        ensure  => latest,
        require => Exec['apt-get update'],
    }
    host { 'pac.collegeboard.org':
        ip => '127.0.0.1',
    }
    class { 'apache': }
    $host_ip = '10.0.2.2'
    $host_port = '3000'
    apache::vhost { 'pac.collegeboard.org':
        port        => '80',
        docroot     => '/vagrant/build',
        directories => [
            {
                path            => '/vagrant/build',
                options         => ['Indexes', 'FollowSymLinks', 'MultiViews'],
                allow_override  => 'all',
                order           => 'allow,deny',
                allow           => 'from all',
            }
        ],
        proxy_pass  => [
            {
                path            => '/',
                url             => "http://${host_ip}:${host_port}/",
                reverse_urls    => ["http://${host_ip}:${host_port}/"],
            }
        ]
    }
/*
    class { 'nodejs': }
    package { 'grunt':
        ensure => 'present',
        provider => 'npm',
        require => Class['nodejs']
    }
    package { 'grunt-cli':
        ensure => 'present',
        provider => 'npm',
        require => Class['nodejs']
    }
*/
}
