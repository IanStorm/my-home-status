# My Home - Status 🟢🔴

[![GitHub Actions](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FIanStorm%2Fmy-home-status%2Fbadge%3Fref%3Dmain&style=flat&label=build&logo=none)](https://actions-badge.atrox.dev/IanStorm/my-home-status/goto?ref=main)
[![Docker Pulls](https://img.shields.io/docker/pulls/ianstorm/my-home-status)](https://hub.docker.com/r/ianstorm/my-home-status)
[![Docker Stars](https://img.shields.io/docker/stars/ianstorm/my-home-status)](https://hub.docker.com/r/ianstorm/my-home-status)

Garage project for **private purposes**.
It provides a custom configuration for monitoring services in my home based on [Gatus](https://github.com/TwiN/gatus) and 🐳 Docker.

See how to put this repo in action at [IanStorm/my-smart-home-ras-pi](https://github.com/IanStorm/my-smart-home-ras-pi).


## How to use in "production"? 👨‍💼 👩‍💼

Use the setup provided in `docker-compose.yml`:
1. Make sure to use `image: [...]` (instead of `build: .`).
2. Make sure to provide `./credentials/status.env` with all `ENV` mentioned in `Dockerfile`.


## How to develop? 👨‍💻 👩‍💻

Make sure you have installed *Visual Studio Code (VSCode)*.

1. Clone this repository.
2. Open the cloned folder in VSCode.
2. Prepare `docker-compose.yml`:
	1. Make sure to use `build: .` (instead of `image: [...]`).
	2. Make sure to provide `./credentials/status.env` with all `ENV` mentioned in `Dockerfile`.
2. Run `docker compose up --build`
* To access the GUI open any browser and enter `http://127.0.0.1:8080`


## Appendix


### Sources 📙

* [GitHub: Gatus](https://github.com/TwiN/gatus)
