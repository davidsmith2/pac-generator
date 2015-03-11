#
#
class baseconfig {
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
}
