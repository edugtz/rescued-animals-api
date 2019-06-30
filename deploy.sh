#!/bin/bash

set -e

sequelize db:migrate
# sequelize db:seed:all