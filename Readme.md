# Run commands on host from docker container

Credits goes to [this thread on StackOverflow](https://stackoverflow.com/questions/32163955/how-to-run-shell-script-on-host-from-docker-container)

# Setup

First of all you need to create the pipe (in this case the path is `./hostpipe/pipe`)

```sh
mkfifo ./hostpipe/pipe
sudo chmod o+x ./hostpipe/pipe
```

o run:

```sh
make create_pipe
```

# How works

On your computer host run this command:

```sh
while true; do eval "$(cat ./hostpipe/pipe)" &> ./hostpipe/output.txt; done
```

This evaluate all the commands to the pipe and redirect the output to the file `./hostpipe/output.txt`. If you want to listen forever even when reboot your computer, you can add the command to crontab.

Then inside the container write commands to the pipe and read the output from the `./hostpipe/output.txt`