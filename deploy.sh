#!/bin/bash

set -e

sequelize db:migrate
sequelize db:seed:undo:all
sequelize db:seed:all