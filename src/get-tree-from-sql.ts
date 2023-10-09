import type { DatabaseTree } from "./types"
import type * as pg from "./pg-types"
import { parse } from "pgsql-ast-parser"
import { processStatement } from "./process-statement"

const getTreeFromSQL = (sql: string): DatabaseTree => {
  const statements = parse(sql)

  const tree: DatabaseTree = {
    schemas: {},
    extensions: [],
    misc: [],
  }

  const ctx = {
    ensureSchema: (schemaName: string) => {
      if (!tree.schemas[schemaName]) {
        tree.schemas[schemaName] = {
          name: schemaName,
          tables: {},
          views: {},
          functions: {},
          domains: {},
          grants: [],
          owner: "",
          _tablelessSequences: {},
        }
      }
    },
    ensureTable: (schemaName: string, tableName: string) => {
      ctx.ensureSchema(schemaName)
      if (!tree.schemas[schemaName].tables[tableName]) {
        tree.schemas[schemaName].tables[tableName] = {
          name: tableName,
          columns: [],
          indexes: {},
          triggers: {},
          grants: [],
          owner: "",
          sequences: [],
          query: "",
          policies: {},
          rules: {},
          alterations: [],
        }
      }
    },
    tree,
  }

  for (const statement of statements) {
    processStatement(statement, ctx)
  }

  return tree
}

export default getTreeFromSQL
