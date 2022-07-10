import { createContext, useContext } from "react";

// An object that contains all contexts for state management
export const contexts = {
  ItemsContext: createContext(),
  MovementContext: createContext(),
  SelectionContext: createContext(),
}

/**
 * Pass Context params to component as props
 * @param { Object }    WrappedComponent    react component
 * @param { Function }  getProps            customed function to set a few props
 * @returns { Object }  React               component with custom props
 */
export function connectToContext(WrappedComponent, getProps){
  return function(props){
    const contextProps = getProps();
    return <WrappedComponent {...contextProps} {...props}/>
  }
}