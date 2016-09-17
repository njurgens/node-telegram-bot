/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var BotApi = (function () {
    function BotApi(api_key) {
        _classCallCheck(this, BotApi);

        this.api_key = api_key;
    }

    _createClass(BotApi, [{
        key: 'getMe',

        /**
         * Get bot's user information.
         *
         * @param callback
         *      Response handler.
         */
        value: function getMe(callback) {
            _request2['default'].get(this._getRequestUri('getMe'), callback);
            return this;
        }

        /**
         * Receive incoming updates.
         *
         * @param parameters
         *      offset [optional]
         *          Identifier of the first update to be returned.  Must be greater
         *          by one than the highest among the identifiers of previously
         *          received updates.  By default, updates starting with the
         *          earliest uncofnrimed updates are returned.
         *
         *      limit [optional]
         *          The maximum number of updates to receive.  Accepts values
         *          between 1 and 100.  Defaults to 100.
         *
         *      timeout [optional]
         *          Timeout in seconds for long polling.  Defaults to 0.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'getUpdates',
        value: function getUpdates(_ref, callback) {
            var offset = _ref.offset;
            var limit = _ref.limit;
            var timeout = _ref.timeout;

            _request2['default'].get(this._getRequestUri('getUpdates', {
                offset: offset,
                limit: limit,
                timeout: timeout
            }), callback);
            return this;
        }

        /**
         * Specify a url to recieve incoming update via an outgoing webhook.
         *
         * @param url
         *      HTTPS url to send updates to.  Use an empty string to remove webhook
         *      integration.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'setWebhook',
        value: function setWebhook(url, callback) {
            // include a randomly generated token as a URL parameter so incomming
            // updates can be authenticated against it
            this._secret = (0, _hat2['default'])();

            _request2['default'].post(this._getRequestUri('setWebhook', {
                url: url + '?' + _querystring2['default'].stringify({ secret: this._secret })
            }), callback);

            return this;
        }

        /**
         * Send text messages.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      text
         *          Message to send.
         *
         *      disable_web_page_preview [optional]
         *          Disable links previews for links in the message.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendMessage',
        value: function sendMessage(_ref2, callback) {
            var chat_id = _ref2.chat_id;
            var text = _ref2.text;
            var disable_web_page_preview = _ref2.disable_web_page_preview;
            var reply_to_message_id = _ref2.reply_to_message_id;
            var reply_markup = _ref2.reply_markup;

            this._checkRequiredParams(chat_id, text);

            _request2['default'].post(this._getRequestUri('sendMessage'), {
                form: {
                    chat_id: chat_id,
                    text: text,
                    disable_web_page_preview: disable_web_page_preview,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Forward a message of any kind.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      from_chat_id
         *          Unique identifier for the chat the message originated from.
         *
         *      message_id
         *          Unique message identifier
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'forwardMessage',
        value: function forwardMessage(_ref3, callback) {
            var chat_id = _ref3.chat_id;
            var from_chat_id = _ref3.from_chat_id;
            var message_id = _ref3.message_id;

            this._checkRequiredParams(chat_id, from_chat_id, message_id);

            _request2['default'].post(this._getRequestUri('forwardMessage'), {
                form: {
                    chat_id: chat_id,
                    from_chat_id: from_chat_id,
                    message_id: message_id
                }
            }, callback);

            return this;
        }

        /**
         * Send a photo.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      photo
         *          Photo to send.
         *
         *      caption [optional]
         *          Photo caption.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendPhoto',
        value: function sendPhoto(_ref4, callback) {
            var chat_id = _ref4.chat_id;
            var photo = _ref4.photo;
            var caption = _ref4.caption;
            var reply_to_message_id = _ref4.reply_to_message_id;
            var reply_markup = _ref4.reply_markup;

            this._checkRequredParams(chat_id, photo);

            _request2['default'].post(this._getRequestUri('sendPhoto'), {
                form: {
                    chat_id: chat_id,
                    photo: photo,
                    caption: caption,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Send audio files.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      audio
         *          Audio to send.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendAudio',
        value: function sendAudio(_ref5, callback) {
            var chat_id = _ref5.chat_id;
            var audio = _ref5.audio;
            var reply_to_message_id = _ref5.reply_to_message_id;
            var reply_markup = _ref5.reply_markup;

            this._checkRequiredParams(chat_id, audio);

            _request2['default'].post(this._getRequestUri('sendAudio'), {
                form: {
                    chat_id: chat_id,
                    audio: audio,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Send generic files.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      document
         *          Document to send.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendDocument',
        value: function sendDocument(_ref6, callback) {
            var chat_id = _ref6.chat_id;
            var document = _ref6.document;
            var reply_to_message_id = _ref6.reply_to_message_id;
            var reply_markup = _ref6.reply_markup;

            this._checkRequiredParams(chat_id, document);

            _request2['default'].post(this._getRequestUri('sendDocument'), {
                form: {
                    chat_id: chat_id,
                    document: document,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Send stickers.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      sticker
         *          Sticker to send.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendSticker',
        value: function sendSticker(_ref7, callback) {
            var chat_id = _ref7.chat_id;
            var sticker = _ref7.sticker;
            var reply_to_message_id = _ref7.reply_to_message_id;
            var reply_markup = _ref7.reply_markup;

            this._checkRequiredParams(chat_id, sticker);

            _request2['default'].post(this._getRequestUri('sendSticker'), {
                form: {
                    chat_id: chat_id,
                    sticker: sticker,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Send video files.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      video
         *          Video to send.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendVideo',
        value: function sendVideo(_ref8, callback) {
            var chat_id = _ref8.chat_id;
            var video = _ref8.video;
            var reply_to_message_id = _ref8.reply_to_message_id;
            var reply_markup = _ref8.reply_markup;

            this._checkRequiredParams(chat_id, video);

            _request2['default'].post(this._getRequestUri('sendVideo'), {
                form: {
                    chat_id: chat_id,
                    video: video,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Send location information.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      latitude
         *          Latitude of location.
         *
         *      longitude
         *          Longitude of location.
         *
         *      reply_to_message_id [optional]
         *          ID of the original message when sending a reply.
         *
         *      reply_markup [optional]
         *          A JSON-seriealized object for a custom reply keyboard,
         *          instructions to hide keyboard, or force a reply from the user.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendLocation',
        value: function sendLocation(_ref9, callback) {
            var chat_id = _ref9.chat_id;
            var latitude = _ref9.latitude;
            var longitude = _ref9.longitude;
            var reply_to_message_id = _ref9.reply_to_message_id;
            var reply_markup = _ref9.reply_markup;

            this._checkRequiredParams(chat_id, latitude, longitude);

            _request2['default'].post(this._getRequestUri('sendLocation'), {
                form: {
                    chat_id: chat_id,
                    latitude: latitude,
                    longitude: longitude,
                    reply_to_message_id: reply_to_message_id,
                    reply_markup: reply_markup
                }
            }, callback);

            return this;
        }

        /**
         * Report something is happening on the bot's side.
         *
         * @param parameters
         *      chat_id
         *          Unique identifier for the message recipient.
         *
         *      action
         *          The action to broadcast.  Available actions are 'typing' for
         *          text message, 'upload_photo' for photos, 'record_video' or
         *          'upload_video' for videos, 'record_audio' or 'upload_audio' for
         *          audio files, 'upload_document' for general files, and
         *          'find_location' for location data.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'sendChatAction',
        value: function sendChatAction(_ref10, callback) {
            var chat_id = _ref10.chat_id;
            var action = _ref10.action;

            this._checkRequiredParams(chat_id, action);

            _request2['default'].post(this._getRequestUri('sendChatAction'), {
                form: {
                    chat_id: chat_id,
                    action: action
                }
            }, callback);

            return this;
        }

        /**
         * Get a list of public profile pictures for a user.
         *
         * @param parameters
         *      user_id
         *          Unique identifier for the user.
         *
         *      offset [optional]
         *          Sequential number of the first photo to be returned.  By
         *          default, all photos are returned.
         *
         *      limit [optional]
         *          The maximum number of photos to retrieve.  Values between 1 and
         *          100 are accepted.  Defaults to 100.
         *
         * @param callback
         *      Response handler.
         */
    }, {
        key: 'getUserProfilePhotos',
        value: function getUserProfilePhotos(_ref11, callback) {
            var user_id = _ref11.user_id;
            var offset = _ref11.offset;
            var limit = _ref11.limit;

            this._checkRequiredParams(user_id);

            _request2['default'].post(this._getRequestUri('getUserProfilePhotos'), {
                form: {
                    user_id: user_id,
                    offset: offset,
                    limit: limit
                }
            }, callback);

            return this;
        }
    }, {
        key: '_getRequestUri',
        value: function _getRequestUri(method, query_params) {
            if (this._api_key === null) {
                throw Error('API key is not set!');
            }

            var query = _querystring2['default'].stringify(query_params);
            return 'https://api.telegram.org/bot' + this._api_key + '/' + method + '?' + query;
        }
    }, {
        key: '_checkRequiredParams',
        value: function _checkRequiredParams() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            params.forEach(function (param) {
                if (typeof param === 'undefined') {
                    throw Error('required parameter missing');
                }
            });
        }
    }, {
        key: 'webhook_secret',
        get: function get() {
            return this._secret;
        }
    }, {
        key: 'api_key',
        get: function get() {
            return this._api_key;
        },
        set: function set(api_key) {
            this._api_key = typeof api_key === 'string' ? api_key : null;
        }
    }, {
        key: 'debug',
        get: function get() {
            return _request2['default'].debug;
        },
        set: function set(debug) {
            _request2['default'].debug = debug;
        }
    }]);

    return BotApi;
})();

exports['default'] = BotApi;
module.exports = exports['default'];