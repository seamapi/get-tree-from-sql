import { Statement } from "pgsql-ast-parser"
import { BuildContext, StatementProcessor } from "./types"
import { createSchema } from "./statement-processors/create-schema"
import { processAsMisc } from "./statement-processors/process-as-misc"

const PROCESSORS: Record<Statement["type"], StatementProcessor> = {
  "create schema": createSchema,
  "alter index": processAsMisc,
  "alter sequence": processAsMisc,
  "alter table": processAsMisc,
  begin: processAsMisc,
  commit: processAsMisc,
  "create composite type": processAsMisc,
  "create extension": processAsMisc,
  "create index": processAsMisc,
  "create sequence": processAsMisc,
  "create table": processAsMisc,
  "create view": processAsMisc,
  "drop table": processAsMisc,
  rollback: processAsMisc,
  set: processAsMisc,
  "truncate table": processAsMisc,
  "create enum": processAsMisc,
  "create function": processAsMisc,
  select: processAsMisc,
  union: processAsMisc,
  "union all": processAsMisc,
  values: processAsMisc,
  with: processAsMisc,
  "with recursive": processAsMisc,
  insert: processAsMisc,
  update: processAsMisc,
  show: processAsMisc,
  prepare: processAsMisc,
  deallocate: processAsMisc,
  delete: processAsMisc,
  tablespace: processAsMisc,
  "create materialized view": processAsMisc,
  "refresh materialized view": processAsMisc,
  "set timezone": processAsMisc,
  "drop sequence": processAsMisc,
  "drop index": processAsMisc,
  "drop type": processAsMisc,
  "drop trigger": processAsMisc,
  comment: processAsMisc,
  raise: processAsMisc,
  "drop function": processAsMisc,
  do: processAsMisc,
  "start transaction": processAsMisc,
}

export const processStatement = (stmt: Statement, ctx: BuildContext) => {
  if (stmt.type in PROCESSORS) {
    PROCESSORS[stmt.type](stmt, ctx)
  } else {
    console.warn("Missing processor for statement type:", stmt.type)
  }
}
