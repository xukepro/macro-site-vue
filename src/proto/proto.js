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
      ChatMsg: {
        fields: {
          type: {
            type: "int32",
            id: 1
          },
          uid: {
            type: "int32",
            id: 2
          },
          content: {
            type: "ChatContent",
            id: 3
          },
          sendTime: {
            type: "string",
            id: 4
          }
        }
      },
      ChatContent: {
        fields: {
          receiveId: {
            type: "int32",
            id: 1
          },
          msgType: {
            type: "int32",
            id: 2
          },
          msgContent: {
            type: "string",
            id: 3
          }
        }
      }
    }
  }
});

export default $root;
