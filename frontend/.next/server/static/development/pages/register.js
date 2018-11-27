module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/AuthButton.js":
/*!**********************************!*\
  !*** ./components/AuthButton.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/vp/Dropbox/projects/Bears-Team-09/frontend/components/AuthButton.js";




var AuthButton = function AuthButton(props) {
  var theme = props.theme,
      action = props.action,
      title = props.title;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledAuthBtn, {
    theme: theme,
    onClick: action,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, title);
};

AuthButton.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  action: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (AuthButton);
var StyledAuthBtn = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({
  displayName: "AuthButton__StyledAuthBtn",
  componentId: "sc-1bzextc-0"
})(["border:0;padding:10px;margin-top:5px;cursor:pointer;border-radius:2px;color:white;background:", ";font-size:1rem;"], function (props) {
  return props.theme;
});

/***/ }),

/***/ "./components/Input.js":
/*!*****************************!*\
  !*** ./components/Input.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/vp/Dropbox/projects/Bears-Team-09/frontend/components/Input.js";




var Input = function Input(props) {
  var name = props.name,
      type = props.type,
      handleChange = props.handleChange,
      placeholder = props.placeholder,
      required = props.required;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Label, {
    htmlFor: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    id: name,
    name: name,
    type: type,
    onChange: handleChange,
    placeholder: placeholder,
    required: required,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  })));
};

Input.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  required: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired,
  handleChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Input);
var Label = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.label.withConfig({
  displayName: "Input__Label",
  componentId: "sc-1wc5mie-0"
})(["input{border:1px solid rgba(0,0,0,0.12);border-radius:3px;padding:5px;backgroundcolor:#fafafa;width:100%;margin-bottom:5px;font-size:1rem;}"]);

/***/ }),

/***/ "./components/LoginButton.js":
/*!***********************************!*\
  !*** ./components/LoginButton.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/vp/Dropbox/projects/Bears-Team-09/frontend/components/LoginButton.js";




var LoginButton = function LoginButton(props) {
  var title = props.title;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton, {
    type: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, title);
};

LoginButton.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (LoginButton);
var StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({
  displayName: "LoginButton__StyledButton",
  componentId: "sc-191pofl-0"
})(["color:white;font-size:1rem;background:#3d0e98;border:0px;border-radius:5px;padding:5px;padding-left:7px;padding-right:7px;cursor:pointer;font-weight:600;"]);

/***/ }),

/***/ "./components/RegisterForm.js":
/*!************************************!*\
  !*** ./components/RegisterForm.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ "./components/Input.js");
/* harmony import */ var _AuthButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AuthButton */ "./components/AuthButton.js");
/* harmony import */ var _LoginButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoginButton */ "./components/LoginButton.js");
var _jsxFileName = "/Users/vp/Dropbox/projects/Bears-Team-09/frontend/components/RegisterForm.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var FormContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(FormContainer, _Component);

  function FormContainer(props) {
    var _this;

    _classCallCheck(this, FormContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAuth", function (e) {
      // Method to be used if we implement auth
      // with Google, Twitter, Facebook, etc.
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (e) {
      // Register new user
      e.preventDefault(); // Perform password validation

      var _this$state = _this.state,
          password = _this$state.password,
          confirmPassword = _this$state.confirmPassword;

      if (password !== confirmPassword) {
        _this.setState({
          passwordsDontMatch: true
        });
      } else {
        _this.setState({
          passwordsDontMatch: false
        });
      } // Handle failed register state
      // Handle Success register state -> redirect

    });

    _this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      passwordsDontMatch: false
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAuth = _this.handleAuth.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(FormContainer, [{
    key: "handleInput",
    value: function handleInput(e) {
      // Method that syncs current input with state
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      var inputValue = _objectSpread({}, this.state, _defineProperty({}, name, value));

      this.setState(inputValue);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var passwordsDontMatch = this.state.passwordsDontMatch;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.handleSubmit,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "firstName",
        name: "firstName",
        type: "text",
        placeholder: "First Name",
        handleChange: this.handleInput,
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "lastName",
        name: "lastName",
        type: "text",
        placeholder: "Last Name",
        handleChange: this.handleInput,
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "email",
        name: "email",
        type: "email",
        placeholder: "Email",
        handleChange: this.handleInput,
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Password",
        handleChange: this.handleInput,
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        handleChange: this.handleInput,
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoginButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: "Register",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }), passwordsDontMatch && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledErrorMsg, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }, "Make sure that passwords match!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AuthButtonWrapper, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, "Or use alternatives:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AuthButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        theme: "#3b5998",
        title: "Register using Facebook",
        action: function action(e) {
          return _this2.handleAuth(e, 'fb');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AuthButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        theme: "#ea4335",
        title: "Register using Google",
        action: function action(e) {
          return _this2.handleAuth(e, 'gl');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AuthButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        theme: "#1da1f2",
        title: "Register using Twitter",
        action: function action(e) {
          return _this2.handleAuth(e, 'tw');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      })));
    }
  }]);

  return FormContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FormContainer);
var AuthButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "RegisterForm__AuthButtonWrapper",
  componentId: "sc-16ycjqm-0"
})(["display:grid;border-top:1px solid rgba(73,73,128,0.52);margin-top:20px;h4{margin-bottom:5px;}"]);
var StyledErrorMsg = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
  displayName: "RegisterForm__StyledErrorMsg",
  componentId: "sc-16ycjqm-1"
})(["margin-left:10px;color:red;"]);

/***/ }),

/***/ "./pages/register.js":
/*!***************************!*\
  !*** ./pages/register.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_RegisterForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/RegisterForm */ "./components/RegisterForm.js");
var _jsxFileName = "/Users/vp/Dropbox/projects/Bears-Team-09/frontend/pages/register.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Register =
/*#__PURE__*/
function (_Component) {
  _inherits(Register, _Component);

  function Register() {
    _classCallCheck(this, Register);

    return _possibleConstructorReturn(this, _getPrototypeOf(Register).apply(this, arguments));
  }

  _createClass(Register, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RegisterWrapper, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InputSection, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Title, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: this
      }, "Register"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: this
      }, "If you already have account: [log in!]"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RegisterForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: this
      })));
    }
  }]);

  return Register;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Register);
var RegisterWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "register__RegisterWrapper",
  componentId: "z9k49p-0"
})(["background:#fafafa;height:100vh;display:flex;flex-direction:column;justify-content:center;"]);
var InputSection = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "register__InputSection",
  componentId: "z9k49p-1"
})(["background:#fff;padding:20px;border:1px solid #00000021;max-width:450px;margin-left:auto;margin-right:auto;width:100%;"]);
var Title = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1.withConfig({
  displayName: "register__Title",
  componentId: "z9k49p-2"
})(["font-size:2.5rem;"]);

/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** multi ./pages/register.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/register.js */"./pages/register.js");


/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });
//# sourceMappingURL=register.js.map