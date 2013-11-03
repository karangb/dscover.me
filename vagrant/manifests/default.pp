class must-have {
  Exec { path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ] }

  include apt

  apt::ppa { "ppa:chris-lea/node.js": }

  exec { 'apt-get update':
    command => '/usr/bin/apt-get update',
    before => Apt::Ppa["ppa:chris-lea/node.js"],
  }

  exec { 'apt-get update 2':
    command => '/usr/bin/apt-get update',
    require => Apt::Ppa["ppa:chris-lea/node.js"],
  }

  exec { 'install yeoman':
    command => '/usr/bin/npm install -g yo grunt-cli bower phantomjs',
    creates => [
      '/usr/lib/node_modules/bower/bin/bower',
      '/usr/lib/node_modules/yo/bin/yo',
      '/usr/lib/node_modules/grunt-cli/bin/grunt',
      '/usr/lib/node_modules/phantomjs/bin/phantomjs'
      ],
    require => [ Exec["apt-get update 2"], Package["nodejs"] ],
  }

  exec { 'install angular generator':
    command => '/usr/bin/npm install -g generator-booang',
    creates => '/usr/lib/node_modules/generator-booang',
    require => Exec["install yeoman"],
  }


  package { ["vim",
             "bash",
             "nodejs",
             "git-core",
             "fontconfig"]:
    ensure => present,
    require => Exec["apt-get update 2"],
  }


}

include must-have
