#
#
class my_nodejs {
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
}
