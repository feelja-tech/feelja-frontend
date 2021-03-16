#!/bin/bash
ssl-proxy-linux-amd64 -from 0.0.0.0:4443 -to 0.0.0.0:4000 -cert ./.certs/192.168.1.4.pem -key ./.certs/192.168.1.4-key.pem
