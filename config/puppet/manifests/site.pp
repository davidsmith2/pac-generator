#
#
File {
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
}
Exec {
    path => [ '/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/' ],
}
include baseconfig
