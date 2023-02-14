import TypeActions from "../TypeActions";

const initialState = {
  customers: {
    results: [],
  },
  allChildOfCustomer: {
    results: [],
  },
  customerById: {},
  isGetCustomers: false,
  isGetAllChildOfCustomer: false,
  isGetCustomerById: false,
  isCreateCustomer: false,
  isUpdateCustomer: false,
  isDeleteCustomer: false,
  errors: {
    getCustomers: "",
    getAllChildOfCustomer: "",
    getCustomerById: "",
    createCustomer: "",
    updateCustomer: "",
    deleteCustomer: "",
  },
};

export const customerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TypeActions.GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        isGetCustomers: true,
        // customers: { results: [] },
        errors: {
          ...state.errors,
          getCustomers: "",
        },
      };
    case TypeActions.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: actions.data || { results: [] },
        isGetCustomers: false,
        errors: {
          ...state.errors,
          getCustomers: "",
        },
      };
    case TypeActions.GET_CUSTOMERS_FAILED:
      return {
        ...state,
        isGetCustomers: false,
        customers: { results: [] },
        errors: {
          ...state.errors,
          getCustomers: actions.error,
        },
      };

    case TypeActions.GET_CUSTOMER_BY_ID_REQUEST:
      return {
        ...state,
        isGetCustomerById: true,
        // customerById: {},
        errors: {
          ...state.errors,
          getCustomerById: "",
        },
      };
    case TypeActions.GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        customerById: actions.data || {},
        isGetCustomerById: false,
        errors: {
          ...state.errors,
          getCustomerById: "",
        },
      };
    case TypeActions.GET_CUSTOMER_BY_ID_FAILED:
      return {
        ...state,
        isGetCustomerById: false,
        customerById: {},
        errors: {
          ...state.errors,
          getCustomerById: actions.error,
        },
      };

    case TypeActions.CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        isCreateCustomer: true,
        errors: {
          ...state.errors,
          createCustomer: "",
        },
      };
    case TypeActions.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isCreateCustomer: false,
        errors: {
          ...state.errors,
          createCustomer: "",
        },
      };
    case TypeActions.CREATE_CUSTOMER_FAILED:
      return {
        ...state,
        isCreateCustomer: false,
        errors: {
          ...state.errors,
          createCustomer: actions.error,
        },
      };

    case TypeActions.UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        isUpdateCustomer: true,
        errors: {
          ...state.errors,
          updateCustomer: "",
        },
      };
    case TypeActions.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isUpdateCustomer: false,
        errors: {
          ...state.errors,
          updateCustomer: "",
        },
      };
    case TypeActions.UPDATE_CUSTOMER_FAILED:
      return {
        ...state,
        isUpdateCustomer: false,
        errors: {
          ...state.errors,
          updateCustomer: actions.error,
        },
      };

    case TypeActions.DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        isDeleteCustomer: true,
        errors: {
          ...state.errors,
          deleteCustomer: "",
        },
      };
    case TypeActions.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isDeleteCustomer: false,
        errors: {
          ...state.errors,
          deleteCustomer: "",
        },
      };
    case TypeActions.DELETE_CUSTOMER_FAILED:
      return {
        ...state,
        isDeleteCustomer: false,
        errors: {
          ...state.errors,
          deleteCustomer: actions.error,
        },
      };

    case TypeActions.GET_ALL_CHILD_OF_CUSTOMER_REQUEST:
      return {
        ...state,
        isGetAllChildOfCustomer: true,
        // allChildOfCustomer: { results: [] },
        errors: {
          ...state.errors,
          getAllChildOfCustomer: "",
        },
      };
    case TypeActions.GET_ALL_CHILD_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        allChildOfCustomer: actions.data || { results: [] },
        isGetAllChildOfCustomer: false,
        errors: {
          ...state.errors,
          getAllChildOfCustomer: "",
        },
      };
    case TypeActions.GET_ALL_CHILD_OF_CUSTOMER_FAILED:
      return {
        ...state,
        isGetAllChildOfCustomer: false,
        allChildOfCustomer: { results: [] },
        errors: {
          ...state.errors,
          getAllChildOfCustomer: actions.error,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default customerReducer;
