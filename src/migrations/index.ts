import * as migration_20260729_172537_enable_rls_public_tables from './20260729_172537_enable_rls_public_tables';

export const migrations = [
  {
    up: migration_20260729_172537_enable_rls_public_tables.up,
    down: migration_20260729_172537_enable_rls_public_tables.down,
    name: '20260729_172537_enable_rls_public_tables'
  },
];
