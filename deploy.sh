#!/bin/bash

set -e

sequelize db:migrate:undo
sequelize db:migrate
sequelize db:seed:all