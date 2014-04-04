## Installing ruby

You may already have installed ruby, but we are going to do it again using `rbenv`, a manager for installing different Ruby versions on your computer.

Open a terminal, and run:

```shell
curl https://raw.github.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash
```

If you are using Ubuntu, run:

```shell
rbenv bootstrap-ubuntu-12-04
```

Now, you are ready to install the latest ruby version, and set it as the default version.

```shell
rbenv install 2.1.1
rbenv global 2.1.1
ruby -v
```

You should see something starting with `ruby 2.1.1p`
