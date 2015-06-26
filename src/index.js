/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import hat from 'hat';
import request from 'request';
import qs from 'querystring';

class BotApi {

    constructor(api_key) {
        this._api_key = api_key;
    }

    get webhook_secret() {
        return this._secret;
    }

    /**
     * Get bot's user information.
     *
     * @param callback
     *      Response handler.
     */
    getMe(callback) {
        request.get(this._getRequestUri('getMe'), callback);
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
    getUpdates({offset, limit, timeout}, callback) {
        request.get(this._getRequestUri('getUpdates', {
            offset,
            limit,
            timeout
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
    setWebhook(url, callback) {
        // include a randomly generated token as a URL parameter so incomming
        // updates can be authenticated against it
        this._secret = hat();

        request.post(this._getRequestUri('setWebhook', {
            secret: this._secret
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
    sendMessage({chat_id, text, disable_web_page_preview, reply_to_message_id,
                 reply_markup}, callback) {
        this._checkRequiredParams(chat_id, text);

        request.post(this._getRequestUri('sendMessage'), {
            form: {
                chat_id,
                text,
                disable_web_page_preview,
                reply_to_message_id,
                reply_markup
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
    forwardMessage({chat_id, from_chat_id, message_id}, callback) {
        this._checkRequiredParams(chat_id, from_chat_id, message_id);

        request.post(this._getRequestUri('forwardMessage'), {
            form: {
                chat_id,
                from_chat_id,
                message_id
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
    sendPhoto({chat_id, photo, caption, reply_to_message_id, reply_markup},
              callback) {
        this._checkRequredParams(chat_id, photo);

        request.post(this._getRequestUri('sendPhoto'), {
            form: {
                chat_id,
                photo,
                caption,
                reply_to_message_id,
                reply_markup
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
    sendAudio({chat_id, audio, reply_to_message_id, reply_markup}, callback) {
        this._checkRequiredParams(chat_id, audio);

        request.post(this._getRequestUri('sendAudio'), {
            form: {
                chat_id,
                audio,
                reply_to_message_id,
                reply_markup
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
    sendDocument({chat_id, document, reply_to_message_id, reply_markup}, callback) {
        this._checkRequiredParams(chat_id, document);

        request.post(this._getRequestUri('sendDocument'), {
            form: {
                chat_id,
                document,
                reply_to_message_id,
                reply_markup
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
    sendSticker({chat_id, sticker, reply_to_message_id, reply_markup}, callback) {
        this._checkRequiredParams(chat_id, sticker);

        request.post(this._getRequestUri('sendSticker'), {
            form: {
                chat_id,
                sticker,
                reply_to_message_id,
                reply_markup
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
    sendVideo({chat_id, video, reply_to_message_id, reply_markup}, callback) {
        this._checkRequiredParams(chat_id, video);

        request.post(this._getRequestUri('sendVideo'), {
            form: {
                chat_id,
                video,
                reply_to_message_id,
                reply_markup
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
    sendLocation({chat_id, latitude, longitude, reply_to_message_id, reply_markup},
                 callback) {
        this._checkRequiredParams(chat_id, latitude, longitude);

        request.post(this._getRequestUri('sendLocation'), {
            form: {
                chat_id,
                latitude,
                longitude,
                reply_to_message_id,
                reply_markup
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
    sendChatAction({chat_id, action}, callback) {
        this._checkRequiredParams(chat_id, action);

        request.post(this._getRequestUri('sendChatAction'), {
            form: {
                chat_id,
                action
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
    getUserProfilePhotos({user_id, offset, limit}, callback) {
        this._checkRequiredParams(user_id);

        request.post(this._getRequestUri('getUserProfilePhotos'), {
            form: {
                user_id,
                offset,
                limit
            }
        }, callback);

        return this;
    }

    _getRequestUri(method, query_params) {
        let query = qs.stringify(query_params);
        return `https://api.telegram.org/bot${this._api_key}/${method}?${query}`;
    }

    _checkRequiredParams(...params) {
        params.forEach(function(param) {
            if (typeof param === 'undefined') {
                throw Error('required parameter missing');
            }
        });
    }
}

export default BotApi;
