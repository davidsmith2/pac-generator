VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise32"
  config.vm.network "forwarded_port", guest: 80, host: 4567
  config.vm.network "forwarded_port", guest: 3000, host: 4568
  config.vm.network "forwarded_port", guest: 35729, host: 35729
  config.vm.provision "puppet" do |puppet|
     puppet.manifests_path = "puppet/manifests"
     puppet.manifest_file  = "site.pp"
     puppet.module_path = "puppet/modules"
  end
end
