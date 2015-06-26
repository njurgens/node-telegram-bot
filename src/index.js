/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
class BotApi {

    constructor(api_key) {
        this._api_key = api_key;
    }

    getUpdates(callback) {
        // TODO: implement
    }

    setWebhook(url, callback) {
        // TODO: implement
    }

    getMe(callback) {
        // TODO: implement
    }

    sendMessage({chat_id, text, disable_preview, reply_to_id, reply_markup},
                callback) {
        // TODO: implement
    }

    forwardMessage({chat_id, from_chat_id, message_id}, callback) {
        // TODO: implement
    }

    sendPhoto({chat_id, photo, caption, reply_to_id, reply_markup}, callback) {
        // TODO: implement
    }

    sendAudio({chat_id, audio, reply_to_id, reply_markup}, callback) {
        // TODO: implement
    }

    sendDocument({chat_id, document, reply_to_id, reply_markup}, callback) {
        // TODO: implement
    }

    sendSticker({chat_id, sticker, reply_to_id, reply_markup}, callback) {
        // TODO: implement
    }

    sendVideo({chat_id, video, reply_to_id, reply_markup}, callback) {
        // TODO: implement
    }

    sendLocation({chat_id, latitude, longitude, reply_to_id, reply_markup},
                 callback) {
        // TODO: implement
    }

    sendChatAction({chat_id, action}, callback) {
        // TODO: implement
    }

    getUserProfilePhotos({user_id, offset, limit}, callback) {
        // TODO: implement
    }
}

export default BotApi;
