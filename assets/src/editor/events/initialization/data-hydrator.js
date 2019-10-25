/**
 * External imports
 */
import { pluralModelName } from '@eventespresso/model';
import { hydrateRelationSchema  } from '@eventespresso/model-schema';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { dispatch } from '@wordpress/data';

const {
	hydrateEntity,
	resolveRelationRecordForRelation,
} = dispatch( 'eventespresso/core' );
const { receiveSchemaForModel } = dispatch( 'eventespresso/schema' );

/**
 * adds all event editor data to the store
 *
 * @param {Object} eventData
 */
const hydrateData = async function*( eventData ) {
	console.log(
		'%cSTART DATA HYDRATION',
		'color: YellowGreen;font-size:24px;',
		eventData
	);
	const { eventId, schemas, relations, ...rawData } = eventData;
	await hydrateSchemas( schemas, relations );
	const hydratedEntities = await hydrateEntityData( rawData, schemas );
	await hydrateRelations( rawData, hydratedEntities, relations );
	console.log(
		'%cDATA HYDRATION COMPLETE',
		'color: YellowGreen;font-size:24px;',
		hydratedEntities
	);
	yield hydratedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {Object} schemas
 * @param {Object} relations
 * @return {Object[]} entities
 */
const hydrateSchemas = async ( schemas, relations ) => {
	const relationSchemas = [];
	if ( schemas ) {
		console.log( '' );
		console.log( '%cHYDRATING SCHEMAS: ', 'color: DarkOrange;font-size:18px;' );
		const modelSchemas = Object.entries( schemas );
		for ( const [ model, schemaData ] of modelSchemas ) {
			console.log( '%c ' + model + ' schema data: ', 'color: tomato;', schemaData );
			if ( ! schemaData.hasOwnProperty( 'schema' ) ) {
				throw new TypeError( 'Invalid Schema ' );
			}
			const schema = await receiveSchemaForModel( model, schemaData );
			if ( relations.hasOwnProperty( model ) &&
				schema.hasOwnProperty( 'schema' ) &&
				schema.schema.hasOwnProperty( 'schema' ) &&
				schema.schema.schema.hasOwnProperty( 'properties' )
			) {
				const modelSchema = schema.schema.schema.properties;
				console.log( '' );
				console.log(
					'%c HYDRATING RELATION SCHEMAS for MODEL: ',
					'color: orange;font-size:14px;',
					model,
					modelSchema,
					relations[ model ]
				);
				let modelRelations = Object.values( relations[ model ] );
				modelRelations = Array.isArray( modelRelations ) ?
					modelRelations.pop() :
					{};
				modelRelations = isDataObject( modelRelations ) ?
						modelRelations :
						{};
				for ( const modelRelation of Object.keys( modelRelations ) ) {
					const relationSingular = modelRelation.toLowerCase();
					const relationPlural = pluralModelName( relationSingular );
					if ( modelSchema.hasOwnProperty( relationPlural ) ) {
						console.log(
							'%c HYDRATE RELATION SCHEMA: ' +
							relationPlural,
							'color: orange;',
							modelSchema[ relationPlural ]
						);
						const generator = hydrateRelationSchema(
							{ schema: modelSchema[ relationPlural ] },
							model,
							relationSingular
						);
						const getRelationSchema = async ( gen ) => {
							for await ( const resolved of gen ) {
								if ( resolved.hasOwnProperty(
									'relationSchema'
									) && resolved.relationSchema
									.hasOwnProperty( 'schema' )
								) {
									relationSchemas.push(
										resolved.relationSchema.schema
									);
								} else {
									console.log(
										'%c INVALID RELATION SCHEMA: ',
										'color: DeepPink; font-size:18px;',
										resolved
									);
								}
							}
						};
						await getRelationSchema( generator );
					}
				}
			}
		}
	}
	console.log(
		'%c > RESOLVED RELATION SCHEMAS: ',
		'color: Salmon;',
		relationSchemas
	);
	return relationSchemas;
};

/**
 * adds entity data to the store
 *
 * @param {Object} rawData
 * @param {Object} schemas
 * @return {Object[]} entities
 */
const hydrateEntityData = async ( rawData, schemas ) => {
	let allHydratedEntities = {};
	if ( rawData ) {
		const modelEntities = Object.entries( rawData );
		console.log( '' );
		console.log(
			'%cHYDRATING ENTITIES',
			'color: GreenYellow;font-size:18px;'
		);
		for ( const [ model, entityData ] of modelEntities ) {
			let modelSchema = schemas[ model ] ? schemas[ model ] : null;
			modelSchema = modelSchema.hasOwnProperty( 'schema' ) ?
				modelSchema.schema :
				null;
			const entities = await hydrateEntities( model, modelSchema, entityData ).then(
				( hydratedEntities ) => {
					return { [ model ]: hydratedEntities };
				}
			);
			allHydratedEntities = { ...allHydratedEntities, ...entities };
		}
	}
	console.log( '' );
	console.log(
		'%c ALL Hydrated Entities: ',
		'color: LawnGreen; font-size:14px;',
		allHydratedEntities,
	);
	return allHydratedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {string} model
 * @param {Object} modelSchema
 * @param {Array|Object} rawData - entities indexed by entityID
 * @return {Object[]} entities
 */
const hydrateEntities = async ( model, modelSchema, rawData ) => {
	console.log(
		'%c hydrateEntities ' + model,
		'color: LimeGreen;',
		' > modelSchema: ', modelSchema,
		' > rawData: ', rawData
	);
	const entityData = isDataObject( rawData ) ?
			Object.values( rawData ) :
			rawData;
	if ( isDataObject( entityData ) ) {
		let hydratedEntities = {};
		for ( const moreEntityData of Object.values( entityData ) ) {
			const entities = await hydrateEntities(
				model,
				modelSchema,
				moreEntityData
			);
			hydratedEntities = { ...hydratedEntities, ...entities };
		}
		return hydratedEntities;
	}
	return hydrateAndReceiveEntities(
		model,
		modelSchema,
		entityData
	);

};

/**
 * creates entities from data amd adds them to the store
 *
 * @param {string} model
 * @param {Object} modelSchema
 * @param {Object[]} entities
 * @return {Object[]} entities
 */
const hydrateAndReceiveEntities = async ( model, modelSchema, entities ) => {
	const resolvedEntities = {};
	if ( Array.isArray( entities ) ) {
		for ( const entityData of entities ) {
			const entity = await hydrateEntity(
				model,
				{ schema: modelSchema },
				entityData
			);
			if ( isModelEntityOfModel( entity, model ) ) {
				resolvedEntities[ entity.id ] = entity;
			} else {
				console.log(
					'%c INVALID ENTITY: ',
					'color: DeepPink; font-size:18px;',
					entity
				);
			}
		}
	}
	return resolvedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {Object} rawData
 * @param {Object[]} hydratedEntities
 * @param {Object} related
 * @return {Object[]} entities
 */
const hydrateRelations = async ( rawData, hydratedEntities, related ) => {
	console.log( '' );
	console.log(
		'%cHYDRATING RELATIONS',
		'color: Orange;font-size:18px;'
	);
	if ( isDataObject( hydratedEntities ) && isDataObject( related ) ) {
		for ( const [ modelName, entities ] of Object.entries( hydratedEntities ) ) {
			if ( related.hasOwnProperty( modelName ) ) {
				const relatedEntities = related[ modelName ];
				for ( const entity of Object.values( entities ) ) {
					if ( relatedEntities.hasOwnProperty( entity.id ) ) {
						for ( const [ relatedModelName, relatedEntityIds ]
							of Object.entries( relatedEntities[ entity.id ] )
						) {
							console.log(
								'%c relatedModelName: ' + relatedModelName +
								' relatedEntityIds: ',
								'color: Chocolate;',
								relatedEntityIds
							);
							if ( Array.isArray( relatedEntityIds ) ) {
								for ( const relatedEntityId of relatedEntityIds ) {
									const relatedEntity = retrieveHydratedEntity(
										relatedModelName,
										relatedEntityId,
										hydratedEntities
									);
									if ( isModelEntityOfModel(
											relatedEntity,
											relatedModelName
										)
									) {
										resolveRelationRecordForRelation(
											relatedEntity,
											modelName,
											entity.id
										);
									} else {
										console.log(
											'%cINVALID ENTITY RELATION',
											'color: DeepPink; font-size:18px;',
											relatedEntity
										);
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

/**
 * @param {string} modelName
 * @param {number|string} entityID
 * @param {Object} hydratedEntities
 * @return {Object} entity
 */
const retrieveHydratedEntity = ( modelName, entityID, hydratedEntities ) => {
	if ( hydratedEntities.hasOwnProperty( modelName ) &&
		hydratedEntities[ modelName ].hasOwnProperty( entityID )
	) {
		return hydratedEntities[ modelName ][ entityID ];
	}
	return null;
};

const isDataObject = ( dataObject ) => typeof dataObject === 'object' &&
	! Array.isArray( dataObject );

export default hydrateData;
