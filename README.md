Dscover.me
==================

This repository will hold the front end application for the dscover.me web app. 
A vagrant dev environment for yeoman (http://yeoman.io) that uses a Ubuntu 12.10 Server image and Puppet for provisioning.

## Dependencies

1. [Vagrant](http://downloads.vagrantup.com/)
2. [VirtualBox (for local servers)](https://www.virtualbox.org/wiki/Downloads)

## Usage

To create your local Yeoman environment:

        $ git clone https://github.com/karangb/dscover.me
        $ cd dscover.me/vagrant
        $ vagrant up

This entire process will take about 10-15 minutes on a high-speed connection (20MBS+). The base box is about 430MB and there's around 300MB of dependencies that need to be downloaded once the VM boots.

### Viewing the project

Once everything is downloaded and puppet is done running, you can log in to the VM and start the server

        $ vagrant ssh
        $ cd ~/yeoman/webapp
        $ npm install
        $ bower install
        $ grunt server OR nohup grunt server > /dev/null 2>&1 &

Then you can access the server on your host machine's browsers at http://192.168.40.10:9000

### Testing

If you want to run unit tests on the project, ssh to the box, cd to ~/yeoman/angular and run the following command

        $ grunt test

This will run your unit tests using the headless Webkit browser "Phantomjs"

### Packaging

If you want to package your project, ssh to the box, cd to ~/yeoman/angular and run the following command

        $ grunt

Compressed, packaged assets can be found in ~/yeoman/angular/dist



## Notes

* The VM uses 1GB of RAM.  This is probably overkill and you can adjust memory allocation in the Vagrantfile if you wish (/vagrant/Vagrantfile)
* Live refresh of the browser is not currently supported as the project server and your browser are running on different operating systems.
* Yeoman is still in beta as of this writing and I've noticed wonkyness with the angular generator, specifically when downloading some dependencies via NPM.

Happy Coding!


