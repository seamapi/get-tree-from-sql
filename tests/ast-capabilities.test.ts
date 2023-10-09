import test from "ava"
import { parse } from "pgsql-ast-parser"

test("CREATE RULE parsing", (t) => {
  const statements =
    parse(`CREATE RULE override_insert AS ON INSERT TO public.events DO INSTEAD (
    INSERT INTO public.events
    VALUES (NEW.*)
    RETURNING *
  );`)
  t.is(statements.length, 1)
})
