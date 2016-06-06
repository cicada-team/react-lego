import { connect } from 'react-redux';
import { pickReduceFunctions } from 'react-lego';

function mapValues(obj, handler) {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = handler(obj[key], key);
  });
  return result;
}

function defaultCreateActionTranslator(stateName) {
  const prefix = 'LEGO';
  const actionPrefix = `${prefix}.${stateName}.`;
  return {
    toActionType(reduceFunctionName) {
      return `${actionPrefix}${reduceFunctionName}`;
    },
    toReduceFunctionName(action) {
      return action.type.replace(new RegExp(`^${actionPrefix}`), '');
    },
  };
}

export function createIngredients(
  stateName, createActionTranslator = defaultCreateActionTranslator) {
  const translator = createActionTranslator(stateName);
  return LegoComponent => {
    const reduceFunctions = pickReduceFunctions(LegoComponent);

    return {
      reducer(originState, action) {
        const reduceFunctionName = translator.toReduceFunctionName(action);
        let result;
        if (reduceFunctions[reduceFunctionName] === undefined) {
          result = originState || LegoComponent.defaultProps;
        } else {
          result = reduceFunctions[reduceFunctionName](
            {
              props: originState,
            },
            action.payload.e,
            ...action.payload.argv
          );
        }
        return result;
      },
      connect(mapStateToProps) {
        return StatelessComponent => connect(mapStateToProps,
          dispatch => mapValues(reduceFunctions,
            (_, reduceFunctionName) => (e, ...argv) => {
              dispatch({
                type: translator.toActionType(reduceFunctionName),
                payload: { e, argv },
              });
            }
          )
        )(StatelessComponent);
      },
    };
  };
}
