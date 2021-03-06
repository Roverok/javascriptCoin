// Generated by CoffeeScript 1.6.3
(function() {
  var EventEmitter, Protocol, Q, helpers, stump,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  helpers = require('enkihelpers');

  Q = require('q');

  stump = require('stump');

  EventEmitter = require('chained-emitter').EventEmitter;

  module.exports = Protocol = (function(_super) {
    __extends(Protocol, _super);

    function Protocol(options, parent) {
      this.options = options;
      this.parent = parent;
      this.handle_open = __bind(this.handle_open, this);
      this.handle_parsed_data = __bind(this.handle_parsed_data, this);
      this.handle_close = __bind(this.handle_close, this);
      this.start = __bind(this.start, this);
      this._get_obj_desc = __bind(this._get_obj_desc, this);
      if (!this.parent) {
        stump.stumpify(this, this.constructor.name);
      } else {
        this.parent.stumpify(this, this.constructor.name);
      }
      this.protocol_ready = Q.defer();
    }

    Protocol.prototype._get_obj_desc = function() {
      return this.constructor.name;
    };

    Protocol.prototype.start = function(connection) {
      this.connection = connection;
      this.info('STARTING PROTOCOL');
      this.connection.on('parsed_data', this.handle_parsed_data);
      this.connection.once('close', this.handle_close);
      this.connection.once('open', this.handle_open);
      return this.protocol_ready.promise;
    };

    Protocol.prototype.handle_close = function() {
      this.info('PROTOCOL CLOSED');
      this.emit('closed', this);
      if (this.options.connection_lost) {
        this.options.connection_lost(this.connection);
      } else {
        this.warn("Connection Lost Not Implemented");
      }
      return true;
    };

    Protocol.prototype.handle_parsed_data = function(parsed_data) {
      throw Error("parsed_data Not Implemented");
    };

    Protocol.prototype.handle_open = function(connection) {
      throw Error("handle_open Not Implemented");
    };

    return Protocol;

  })(EventEmitter);

}).call(this);
