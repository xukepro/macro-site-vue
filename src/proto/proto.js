/*eslint-disable*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
  .addJSON({
    protocol: {
      options: {
        optimize_for: "SPEED",
        java_package: "com.xuke.macrosite.common.protobuf"
      },
      nested: {
        ChatMsgReq: {
          fields: {
            type: {
              type: "int32",
              id: 1
            },
            uid: {
              type: "int32",
              id: 2
            }
          }
        },
        ChatMsgRes: {
          fields: {
            type: {
              type: "int32",
              id: 1
            },
            uid: {
              type: "int32",
              id: 2
            },
            chatContent: {
              type: "ChatContentRes",
              id: 3
            },
            sendTime: {
              type: "string",
              id: 4
            }
          }
        },
        ChatContentRes: {
          fields: {
            rid: {
              type: "int32",
              id: 1
            },
            type: {
              type: "int32",
              id: 2
            },
            content: {
              type: "string",
              id: 3
            }
          }
        }
      }
    }
  });

export default $root;
