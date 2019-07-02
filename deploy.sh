#!/bin/bash

set -e

# Making sure that we run migrations whenever there is a new one
sequelize db:migrate