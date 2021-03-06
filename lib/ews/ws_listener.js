// Generated by CoffeeScript 1.6.3
(function() {
  var Connection, Q, WebSocketServer, WebsocketListener, listener, stump,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Q = require('q');

  WebSocketServer = require('ws').Server;

  stump = require('stump');

  Connection = require('./ws_connection');

  module.exports = WebsocketListener = (function() {
    function WebsocketListener(options) {
      this.options = options;
      this.do_not_know_how_to_make_protocol = __bind(this.do_not_know_how_to_make_protocol, this);
      this.connect_error = __bind(this.connect_error, this);
      this.connection_made = __bind(this.connection_made, this);
      this.close = __bind(this.close, this);
      this.listen = __bind(this.listen, this);
      stump.stumpify(this, this.constructor.name);
      this.options.protocol_factory = this.options.protocol_factory || this.do_not_know_how_to_make_protocol;
    }

    WebsocketListener.prototype.listen = function() {
      var _this = this;
      this.info('LISTENING');
      return Q.fcall(function() {
        _this.wss = new WebSocketServer(_this.options.wsconfig);
        _this.wss.on('connection', _this.connection_made);
        return _this.wss.on('error', _this.connect_error);
      });
    };

    WebsocketListener.prototype.close = function() {
      this.wss.close();
      return Q.when(true);
    };

    WebsocketListener.prototype.connection_made = function(ws) {
      var conn,
        _this = this;
      conn = new Connection(this);
      conn.once('open', function(connection) {
        return _this.options.protocol_factory(connection);
      });
      return conn.socket_accepted(ws);
    };

    WebsocketListener.prototype.connect_error = function(err) {
      return this.error('connect error', err);
    };

    WebsocketListener.prototype.do_not_know_how_to_make_protocol = function(connection) {
      this.error('DO NOT KNOW HOW TO MAKE PROTOCOL');
      return connection.disconnect();
    };

    return WebsocketListener;

  })();

  if (!module.parent) {
    listener = new WebsocketListener({
      wsconfig: {
        port: 6150
      }
    });
    listener.listen();
  }

}).call(this);
