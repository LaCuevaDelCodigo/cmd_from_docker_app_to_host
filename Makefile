BACK_SERVICE=host_cmd_from_docker

create_pipe:
	@mkfifo hostpipe/pipe
	@chmod o+x hostpipe/pipe

dev:
	@docker compose run --rm --service-ports $(BACK_SERVICE) npm run dev
