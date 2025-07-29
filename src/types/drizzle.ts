import type {
	ExtractTablesWithRelations,
	InferSelectModel,
	Many,
} from "drizzle-orm";

// Helper type to find the tsName corresponding to a given dbName in TSchema
type FindTsNameByDbName<
	TSchema extends Record<string, any>,
	TDbNameToFind extends string,
> = {
	[K in keyof ExtractTablesWithRelations<TSchema>]: ExtractTablesWithRelations<TSchema>[K] extends {
		dbName: TDbNameToFind;
	}
		? K
		: never;
}[keyof ExtractTablesWithRelations<TSchema>];

// Helper type to find the dbName corresponding to a given tsName in TSchema
type FindDbNameByTsName<
	TSchema extends Record<string, any>,
	TTable extends TSchema[keyof TSchema],
> = {
	[K in keyof TSchema]: TSchema[K] extends TTable ? K : never;
}[keyof TSchema];

/**
 * Utility type to infer the model type for a given table name from the schema.
 * Handles nested relations recursively.
 * Uses referencedTableName (dbName) and FindTsNameByDbName helper.
 */
export type ModelWithRelationsFromName<
	TSchema extends Record<string, any>,
	TTableName extends keyof ExtractTablesWithRelations<TSchema>,
> = InferSelectModel<TSchema[TTableName]> & {
	[K in keyof ExtractTablesWithRelations<TSchema>[TTableName]["relations"]]?: ExtractTablesWithRelations<TSchema>[TTableName]["relations"][K] extends infer TRelation
		? TRelation extends { referencedTableName: infer TRefDbName extends string }
			? FindTsNameByDbName<TSchema, TRefDbName> extends infer TRefTsName extends
					keyof ExtractTablesWithRelations<TSchema>
				? TRelation extends Many<any>
					? ModelWithRelationsFromName<TSchema, TRefTsName>[]
					: ModelWithRelationsFromName<TSchema, TRefTsName> | null
				: never
			: never
		: never;
};

/**
 * Utility type to infer the model type for a given table from the schema.
 * Handles nested relations recursively.
 * Uses referencedTableName (dbName) and FindDbNameByTsName helper.
 */
export type ModelWithRelations<
	TSchema extends Record<string, any>,
	TTable extends TSchema[keyof TSchema],
> = FindDbNameByTsName<TSchema, TTable> extends infer TTableName extends
	keyof ExtractTablesWithRelations<TSchema>
	? ModelWithRelationsFromName<TSchema, TTableName>
	: never;
