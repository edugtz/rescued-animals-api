#!/bin/bash

set -e

sequelize db:migrate:undo && db:migrate && db:seed:all