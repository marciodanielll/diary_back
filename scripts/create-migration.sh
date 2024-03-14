#!/bin/bash
if [ -z "$1" ]; then
  echo "Type the name of the migration you want to create:"
  read migrationName
else
  migrationName=$1
fi

npx typeorm migration:create ../src/infra/database/postgres-type-orm/migrations/$migrationName

## Otimizar esse script, para rodar via npm run create-migration
## ajustar para dar peremissão para todo munso para editar a migration